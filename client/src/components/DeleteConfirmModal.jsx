import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  student,
  isDeleting,
  onConfirm,
  onClose,
}) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isDeleting ? undefined : onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon with pulsating ring */}
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-5 shadow-lg shadow-rose-500/20">
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Header */}
        <div className="text-center mb-5">
          <h3 className="text-lg font-bold text-white mb-2">
            Confirm Student Deletion
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you sure you want to permanently delete this student record? This action removes the data from MongoDB and cannot be undone.
          </p>
        </div>

        {/* Target Student Info Preview Card */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Student Name:</span>
            <span className="font-bold text-white">{student.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Student ID:</span>
            <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
              {student.studentId}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Course:</span>
            <span className="text-slate-300 truncate max-w-[200px]" title={student.course}>
              {student.course}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(student._id || student.id)}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
