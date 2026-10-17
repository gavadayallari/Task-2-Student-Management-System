import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { COURSES_LIST } from './FilterBar';

export default function StudentModal({
  isOpen,
  student,
  mode = 'edit', // 'edit' or 'view'
  onClose,
  onSave,
  isSaving,
}) {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    course: 'Computer Science & Engineering',
    semester: 'Semester 1',
    address: '',
    enrollmentDate: '',
    status: 'Active',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        studentId: student.studentId || '',
        email: student.email || '',
        phone: student.phone || '',
        gender: student.gender || 'Male',
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth).toISOString().split('T')[0]
          : '',
        course: student.course || 'Computer Science & Engineering',
        semester: student.semester || 'Semester 1',
        address: student.address || '',
        enrollmentDate: student.enrollmentDate
          ? new Date(student.enrollmentDate).toISOString().split('T')[0]
          : '',
        status: student.status || 'Active',
      });
      setFormErrors({});
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Enter a valid phone number';
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.course) errors.course = 'Course is required';
    if (!formData.semester) errors.semester = 'Semester is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(student._id || student.id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isSaving ? undefined : onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Edit Student Information
              </h3>
              <p className="text-xs text-slate-400">
                Updating record for <span className="text-indigo-400 font-semibold">{student.name}</span> ({student.studentId})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSaving}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Name and Student ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border ${
                  formErrors.name ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
              {formErrors.name && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student ID <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. STU-2024-001"
                className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border font-mono uppercase ${
                  formErrors.studentId ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
              {formErrors.studentId && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.studentId}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.edu"
                className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border ${
                  formErrors.email ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
              {formErrors.email && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border ${
                  formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
              {formErrors.phone && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Gender & DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Gender <span className="text-rose-400">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Date of Birth <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border ${
                  formErrors.dateOfBirth ? 'border-rose-500 ring-1 ring-rose-500/40' : 'border-slate-800'
                } text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
              {formErrors.dateOfBirth && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: Course & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Course / Department <span className="text-rose-400">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {COURSES_LIST.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Semester / Year <span className="text-rose-400">*</span>
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
              </select>
            </div>
          </div>

          {/* Row 5: Enrollment Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Enrollment Date
              </label>
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Status <span className="text-rose-400">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-semibold"
              >
                <option value="Active" className="text-emerald-400">Active</option>
                <option value="Inactive" className="text-amber-400">Inactive</option>
              </select>
            </div>
          </div>

          {/* Row 6: Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Residential Address
            </label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Street, Area, City, State, PIN"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
