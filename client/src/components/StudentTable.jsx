import React from 'react';
import {
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Phone,
  Mail,
  Copy,
  Check,
  UserX,
  Plus,
} from 'lucide-react';

// Generates consistent subtle gradient avatar based on name
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

export default function StudentTable({
  students = [],
  isLoading,
  onViewDetails,
  onEditStudent,
  onDeleteStudent,
  onAddNew,
}) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-8 shadow-xl">
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-slate-800/80 rounded-xl w-full"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-slate-800/50 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-12 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
          <UserX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No Students Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
          No student records matched your current query or filter criteria. Try adjusting your search or add a new student.
        </p>
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <th className="py-3.5 px-4 sm:px-6">Student ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Course / Program</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Contact</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Enrolled</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-sm">
            {students.map((student) => {
              const formattedDate = student.enrollmentDate
                ? new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'N/A';

              const isActive = student.status === 'Active';

              return (
                <tr
                  key={student._id || student.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Student ID */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2 py-1 rounded-lg border border-indigo-500/25">
                        {student.studentId}
                      </span>
                      <button
                        onClick={() => handleCopy(student.studentId, student._id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 p-1 transition-opacity"
                        title="Copy Student ID"
                      >
                        {copiedId === student._id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Name & Gender */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${getAvatarGradient(
                          student.name
                        )} flex items-center justify-center text-white text-xs font-bold shadow-md ring-1 ring-white/10 shrink-0`}
                      >
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <div
                          onClick={() => onViewDetails(student)}
                          className="font-semibold text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                          {student.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{student.gender}</span>
                          <span>•</span>
                          <span className="text-slate-400 font-mono text-[10px]">
                            {student.semester || 'Sem 1'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course / Program */}
                  <td className="py-4 px-4">
                    <span className="inline-block text-xs font-medium text-slate-200 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 max-w-[200px] truncate" title={student.course}>
                      {student.course}
                    </span>
                  </td>

                  {/* Contact info (Email & Phone) */}
                  <td className="py-4 px-4 hidden md:table-cell whitespace-nowrap">
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[170px]" title={student.email}>
                          {student.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{student.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Enrollment Date */}
                  <td className="py-4 px-4 hidden lg:table-cell whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{formattedDate}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
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
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* View Details */}
                      <button
                        onClick={() => onViewDetails(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Student */}
                      <button
                        onClick={() => onEditStudent(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                        title="Edit Student Information"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Student */}
                      <button
                        onClick={() => onDeleteStudent(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Student Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
