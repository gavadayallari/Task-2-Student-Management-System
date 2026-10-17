import React, { useState } from 'react';
import {
  UserPlus,
  Save,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { COURSES_LIST } from '../components/FilterBar';

export default function AddStudentPage({
  onAddStudent,
  isSubmitting,
  setActiveTab,
}) {
  const initialFormState = {
    name: '',
    studentId: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    course: 'Computer Science & Engineering',
    semester: 'Semester 1',
    address: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Generate unique student ID helper
  const handleAutoGenerateId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `STU-2024-${randomNum}`;
    setFormData((prev) => ({ ...prev, studentId: newId }));
    if (formErrors.studentId) {
      setFormErrors((prev) => ({ ...prev, studentId: null }));
    }
  };

  const validate = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full student name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Student ID validation
    if (!formData.studentId.trim()) {
      errors.studentId = 'Student ID is required';
    } else if (!/^[A-Za-z0-9_-]{3,20}$/.test(formData.studentId.trim())) {
      errors.studentId = 'ID must be 3-20 alphanumeric characters (e.g. STU-2024-001)';
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. student@college.edu)';
    }

    // Phone validation
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Please provide a valid phone number (7-15 digits)';
    }

    // DOB validation
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        errors.dateOfBirth = 'Date of birth must be in the past';
      }
    }

    // Course & Semester
    if (!formData.course) errors.course = 'Please select a course / department';
    if (!formData.semester) errors.semester = 'Please select a semester or year';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const success = await onAddStudent(formData);
    if (success) {
      setFormData(initialFormState);
      setFormErrors({});
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setFormErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('students')}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            title="Back to Students list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Add New Student Record
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter academic credentials and personal details to save to MongoDB
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAutoGenerateId}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Generate Student ID</span>
        </button>
      </div>

      {/* Main Form Container */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div>
            <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <span>1. Personal & Identification Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
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
                  className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border ${
                    formErrors.name
                      ? 'border-rose-500 ring-1 ring-rose-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.name}
                  </p>
                )}
              </div>

              {/* Student ID */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Student ID <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoGenerateId}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. STU-2024-001"
                  className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border font-mono uppercase ${
                    formErrors.studentId
                      ? 'border-rose-500 ring-1 ring-rose-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                />
                {formErrors.studentId && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.studentId}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student.name@example.edu"
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border ${
                      formErrors.email
                        ? 'border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-slate-800 focus:border-indigo-500'
                    } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border ${
                      formErrors.phone
                        ? 'border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-slate-800 focus:border-indigo-500'
                    } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Gender <span className="text-rose-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Date of Birth <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border ${
                      formErrors.dateOfBirth
                        ? 'border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-slate-800 focus:border-indigo-500'
                    } text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
                  />
                </div>
                {formErrors.dateOfBirth && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Academic & Enrollment */}
          <div>
            <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <span>2. Academic Program & Status</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Course / Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Course or Department <span className="text-rose-400">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {COURSES_LIST.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester / Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Semester or Year <span className="text-rose-400">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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

              {/* Enrollment Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Enrollment Date
                </label>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Enrollment Status <span className="text-rose-400">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-semibold"
                >
                  <option value="Active" className="text-emerald-400">Active (Regular student)</option>
                  <option value="Inactive" className="text-amber-400">Inactive (Leave / Graduated)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Address */}
          <div>
            <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <span>3. Residential Address & Notes</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Flat 402, Green Valley Apartments, Pune, Maharashtra 411038"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>

            <div className="w-full sm:w-auto flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab('students')}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Student Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
