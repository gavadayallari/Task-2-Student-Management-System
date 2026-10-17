import React, { useState } from 'react';
import {
  Users,
  Plus,
  RefreshCw,
  Download,
  AlertCircle,
} from 'lucide-react';
import FilterBar from '../components/FilterBar';
import StudentTable from '../components/StudentTable';
import StudentCardView from '../components/StudentCardView';
import Pagination from '../components/Pagination';

export default function StudentsPage({
  students,
  totalStudents,
  totalPages,
  currentPage,
  limit,
  search,
  setSearch,
  selectedCourse,
  setSelectedCourse,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onPageChange,
  onLimitChange,
  onClearFilters,
  isLoading,
  onViewDetails,
  onEditStudent,
  onDeleteStudent,
  setActiveTab,
  onRefresh,
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // CSV Export utility
  const handleExportCSV = () => {
    if (!students || students.length === 0) return;

    const headers = [
      'Student ID',
      'Full Name',
      'Email',
      'Phone',
      'Gender',
      'Course',
      'Semester',
      'Status',
      'Enrollment Date',
      'Address',
    ];

    const rows = students.map((s) => [
      `"${s.studentId || ''}"`,
      `"${s.name || ''}"`,
      `"${s.email || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.gender || ''}"`,
      `"${s.course || ''}"`,
      `"${s.semester || ''}"`,
      `"${s.status || ''}"`,
      `"${s.enrollmentDate ? new Date(s.enrollmentDate).toISOString().split('T')[0] : ''}"`,
      `"${(s.address || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StudentHub_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Student Records Directory
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              {totalStudents} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, update, view, and export student profiles with real-time MongoDB queries
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('add-student')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onClearFilters={onClearFilters}
        totalResults={totalStudents}
        onExportCSV={handleExportCSV}
      />

      {/* Data Presentation (Table or Card View) */}
      {viewMode === 'table' ? (
        <StudentTable
          students={students}
          isLoading={isLoading}
          onViewDetails={onViewDetails}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
          onAddNew={() => setActiveTab('add-student')}
        />
      ) : (
        <StudentCardView
          students={students}
          onViewDetails={onViewDetails}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalStudents}
        limit={limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
