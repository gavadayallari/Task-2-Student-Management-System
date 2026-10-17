import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import AboutPage from './pages/AboutPage';
import StudentModal from './components/StudentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { ToastProvider, useToast } from './context/ToastContext';
import { api } from './services/api';

function AppContent() {
  const { success, error, info } = useToast();

  // Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Dashboard Stats State
  const [stats, setStats] = useState(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  // Student Directory State
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);

  // Filter & Search State
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch Dashboard Stats
  const loadStats = useCallback(async () => {
    try {
      setIsStatsLoading(true);
      const res = await api.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  // 2. Fetch Students List with query params
  const loadStudents = useCallback(async () => {
    try {
      setIsStudentsLoading(true);
      const res = await api.getStudents({
        search,
        course: selectedCourse,
        status: selectedStatus,
        sortBy,
        sortOrder,
        page: currentPage,
        limit,
      });

      if (res.success) {
        setStudents(res.data || []);
        setTotalStudents(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      console.error('Error loading students:', err);
      error(err.message || 'Failed to fetch student records from database');
    } finally {
      setIsStudentsLoading(false);
    }
  }, [search, selectedCourse, selectedStatus, sortBy, sortOrder, currentPage, limit, error]);

  // Initial load
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Load students whenever query parameters change
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Refresh All Data Handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadStats(), loadStudents()]);
    setIsRefreshing(false);
    info('Refreshed data from MongoDB database', 'Updated');
  };

  // Clear All Filters
  const handleClearFilters = () => {
    setSearch('');
    setSelectedCourse('All');
    setSelectedStatus('All');
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
    info('All filters and search criteria cleared');
  };

  // Global Search trigger
  const handleGlobalSearch = (term) => {
    setSearch(term);
    setCurrentPage(1);
  };

  // View Details trigger
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setActiveTab('student-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Edit Student trigger (opens modal)
  const handleOpenEdit = (student) => {
    setStudentToEdit(student);
    setEditModalOpen(true);
  };

  // Save Edited Student to MongoDB
  const handleSaveEdit = async (id, updatedData) => {
    try {
      setIsSaving(true);
      const res = await api.updateStudent(id, updatedData);
      if (res.success && res.data) {
        success(`Student "${res.data.name}" updated successfully!`, 'Record Updated');
        setEditModalOpen(false);
        setStudentToEdit(null);

        // Update selectedStudent if currently viewing details
        if (selectedStudent && (selectedStudent._id === id || selectedStudent.id === id)) {
          setSelectedStudent(res.data);
        }

        // Refresh lists and stats seamlessly
        loadStudents();
        loadStats();
      }
    } catch (err) {
      error(err.message || 'Failed to update student record');
    } finally {
      setIsSaving(false);
    }
  };

  // Add New Student to MongoDB
  const handleAddStudent = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await api.createStudent(formData);
      if (res.success && res.data) {
        success(`Student "${res.data.name}" added successfully with ID ${res.data.studentId}!`, 'Student Enrolled');
        
        // Refresh data
        loadStudents();
        loadStats();
        
        // Navigate to student directory
        setActiveTab('students');
        return true;
      }
      return false;
    } catch (err) {
      error(err.message || 'Failed to create student record');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Student trigger (opens confirmation modal)
  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  // Confirm Delete Student from MongoDB
  const handleConfirmDelete = async (id) => {
    try {
      setIsDeleting(true);
      const res = await api.deleteStudent(id);
      if (res.success) {
        success(res.message || 'Student record deleted successfully', 'Deleted');
        setDeleteModalOpen(false);
        setStudentToDelete(null);

        // If user was on student-details page for this deleted student, navigate back to students
        if (selectedStudent && (selectedStudent._id === id || selectedStudent.id === id)) {
          setSelectedStudent(null);
          setActiveTab('students');
        }

        // Refresh data
        loadStudents();
        loadStats();
      }
    } catch (err) {
      error(err.message || 'Failed to delete student record');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsMobileOpen={setIsMobileOpen}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onGlobalSearch={handleGlobalSearch}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardPage
              stats={stats}
              isLoading={isStatsLoading}
              setActiveTab={setActiveTab}
              onViewDetails={handleViewDetails}
              onAddNew={() => setActiveTab('add-student')}
            />
          )}

          {activeTab === 'students' && (
            <StudentsPage
              students={students}
              totalStudents={totalStudents}
              totalPages={totalPages}
              currentPage={currentPage}
              limit={limit}
              search={search}
              setSearch={(val) => {
                setSearch(val);
                setCurrentPage(1);
              }}
              selectedCourse={selectedCourse}
              setSelectedCourse={(val) => {
                setSelectedCourse(val);
                setCurrentPage(1);
              }}
              selectedStatus={selectedStatus}
              setSelectedStatus={(val) => {
                setSelectedStatus(val);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onPageChange={setCurrentPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setCurrentPage(1);
              }}
              onClearFilters={handleClearFilters}
              isLoading={isStudentsLoading}
              onViewDetails={handleViewDetails}
              onEditStudent={handleOpenEdit}
              onDeleteStudent={handleOpenDelete}
              setActiveTab={setActiveTab}
              onRefresh={handleRefresh}
            />
          )}

          {activeTab === 'add-student' && (
            <AddStudentPage
              onAddStudent={handleAddStudent}
              isSubmitting={isSubmitting}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'student-details' && (
            <StudentDetailsPage
              student={selectedStudent}
              onBack={() => setActiveTab('students')}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          )}

          {activeTab === 'about' && <AboutPage />}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/60 px-6 py-5 text-center text-xs text-slate-400">
          <p>
            StudentHub © {new Date().getFullYear()} • Auspify Technologies Full Stack Internship Task 2 • Designed & Developed by{' '}
            <strong className="text-slate-200">Yallari Gavada</strong>
          </p>
        </footer>
      </div>

      {/* Edit Student Modal */}
      <StudentModal
        isOpen={editModalOpen}
        student={studentToEdit}
        mode="edit"
        onClose={() => {
          setEditModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveEdit}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        student={studentToDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
