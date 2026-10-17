import React from 'react';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  Database,
  User,
  ShieldCheck,
  Send,
} from 'lucide-react';

function getAvatarGradient(name = '') {
  const gradients = [
    'from-indigo-600 via-purple-600 to-pink-600',
    'from-blue-600 via-indigo-600 to-violet-600',
    'from-emerald-600 via-teal-600 to-cyan-600',
    'from-amber-600 via-orange-600 to-red-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function StudentDetailsPage({
  student,
  onBack,
  onEdit,
  onDelete,
}) {
  if (!student) {
    return (
      <div className="bg-slate-900/70 rounded-3xl border border-slate-800 p-12 text-center">
        <p className="text-slate-400 text-sm mb-4">No student record selected.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
        >
          Back to Students
        </button>
      </div>
    );
  }

  const isActive = student.status === 'Active';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not Specified';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTimestamp = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation & Action Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" />
          <span>Back to Students</span>
        </button>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onEdit(student)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => onDelete(student)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Avatar and basic info */}
          <div className="flex items-center space-x-5">
            <div
              className={`w-20 h-20 rounded-3xl bg-gradient-to-tr ${getAvatarGradient(
                student.name
              )} flex items-center justify-center text-white text-2xl font-extrabold shadow-xl ring-2 ring-white/10 shrink-0`}
            >
              {getInitials(student.name)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                  {student.name}
                </h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  ></span>
                  {student.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-md border border-indigo-500/25 font-bold">
                  {student.studentId}
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">{student.course}</span>
                <span>•</span>
                <span className="text-slate-400 font-mono">{student.semester}</span>
              </div>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="flex items-center space-x-2 self-stretch sm:self-auto justify-end">
            <a
              href={`mailto:${student.email}`}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
              title={`Send Email to ${student.email}`}
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={`tel:${student.phone}`}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              title={`Call ${student.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Information Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Academic Credentials */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Credentials</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Department / Course:</span>
              <span className="font-semibold text-white text-right">{student.course}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Current Semester / Year:</span>
              <span className="font-mono font-semibold text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                {student.semester}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Enrollment Date:</span>
              <span className="font-semibold text-slate-200">
                {formatDate(student.enrollmentDate)}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Registration Status:</span>
              <span
                className={`font-semibold ${
                  isActive ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Personal & Contact Information */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <User className="w-4 h-4" />
            <span>Personal & Contact Info</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Email Address:</span>
              <a
                href={`mailto:${student.email}`}
                className="font-semibold text-indigo-400 hover:underline"
              >
                {student.email}
              </a>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Phone Number:</span>
              <a
                href={`tel:${student.phone}`}
                className="font-semibold text-slate-200 hover:text-indigo-400"
              >
                {student.phone}
              </a>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Gender:</span>
              <span className="font-semibold text-slate-200">{student.gender}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Date of Birth:</span>
              <span className="font-semibold text-slate-200">
                {formatDate(student.dateOfBirth)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Residential Address */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <MapPin className="w-4 h-4" />
            <span>Residential Address</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            {student.address || 'No residential address has been specified for this student.'}
          </p>
        </div>

        {/* Card 4: Database & System Audit Trail */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Database className="w-4 h-4" />
            <span>System Audit Trail</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">MongoDB Document ID:</span>
              <span className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 select-all">
                {student._id || student.id}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Record Created At:</span>
              <span className="font-semibold text-slate-300">
                {formatTimestamp(student.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Last Updated At:</span>
              <span className="font-semibold text-slate-300">
                {formatTimestamp(student.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
