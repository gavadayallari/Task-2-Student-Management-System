import React from 'react';
import {
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  MapPin,
} from 'lucide-react';

function getAvatarGradient(name = '') {
  const gradients = [
    'from-indigo-600 to-violet-600',
    'from-blue-600 to-cyan-600',
    'from-emerald-600 to-teal-600',
    'from-amber-600 to-orange-600',
    'from-pink-600 to-rose-600',
    'from-purple-600 to-indigo-600',
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

export default function StudentCardView({
  students = [],
  onViewDetails,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {students.map((student) => {
        const isActive = student.status === 'Active';
        const formattedDate = student.enrollmentDate
          ? new Date(student.enrollmentDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'N/A';

        return (
          <div
            key={student._id || student.id}
            className="group relative bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            {/* Header: Avatar, Name, Status */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${getAvatarGradient(
                      student.name
                    )} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-1 ring-white/10 shrink-0`}
                  >
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <h4
                      onClick={() => onViewDetails(student)}
                      className="text-base font-bold text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors leading-snug"
                    >
                      {student.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                      {student.studentId}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
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

              {/* Course & Semester badge */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/40 px-2.5 py-1.5 rounded-xl border border-indigo-500/20">
                  <GraduationCap className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span className="truncate font-medium">{student.course}</span>
                  <span className="ml-auto text-[11px] text-slate-400 font-mono">
                    {student.semester}
                  </span>
                </div>
              </div>

              {/* Details list */}
              <div className="space-y-2 text-xs text-slate-300 mb-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate" title={student.email}>
                    {student.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Enrolled: {formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => onViewDetails(student)}
                className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Profile</span>
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onEditStudent(student)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                  title="Edit Student"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteStudent(student)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete Student"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
