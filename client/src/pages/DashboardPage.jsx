import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Database,
  Eye,
  Award,
} from 'lucide-react';
import StatCard from '../components/StatCard';

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function DashboardPage({
  stats,
  isLoading,
  setActiveTab,
  onViewDetails,
  onAddNew,
}) {
  const total = stats?.totalStudents || 0;
  const active = stats?.activeStudents || 0;
  const inactive = stats?.inactiveStudents || 0;
  const totalCourses = stats?.totalCourses || 0;
  const courseDist = stats?.courseDistribution || [];
  const genderDist = stats?.genderDistribution || [];
  const recentStudents = stats?.recentStudents || [];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-purple-950/60 border border-indigo-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auspify Technologies Internship • Task 2</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">StudentHub</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Full-stack student record administration system built with React, Node.js, Express, and MongoDB. Manage student profiles, academic courses, live metrics, and search queries with high performance.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setActiveTab('add-student')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Student</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 flex items-center space-x-2 transition-all"
            >
              <span>View All Students</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Students"
          value={isLoading ? '...' : total}
          icon={Users}
          trend={`${total} enrolled`}
          colorTheme="indigo"
          subtitle="All registered student records"
          onClick={() => setActiveTab('students')}
        />

        <StatCard
          title="Active Students"
          value={isLoading ? '...' : active}
          icon={UserCheck}
          trend={total > 0 ? `${Math.round((active / total) * 100)}% verified` : '0%'}
          colorTheme="emerald"
          subtitle="Currently attending courses"
          onClick={() => setActiveTab('students')}
        />

        <StatCard
          title="Inactive Students"
          value={isLoading ? '...' : inactive}
          icon={UserX}
          trend={total > 0 ? `${Math.round((inactive / total) * 100)}% on hold` : '0%'}
          colorTheme="amber"
          subtitle="Graduated, leave, or suspended"
          onClick={() => setActiveTab('students')}
        />

        <StatCard
          title="Academic Programs"
          value={isLoading ? '...' : totalCourses}
          icon={GraduationCap}
          trend="Diverse Fields"
          colorTheme="violet"
          subtitle="Active department programs"
        />
      </div>

      {/* Middle Section: Course Distribution & Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Enrollment Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Department Enrollment Distribution
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Breakdown of active students across enrolled academic streams
                </p>
              </div>
            </div>

            {courseDist.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No course enrollment data available yet.
              </p>
            ) : (
              <div className="space-y-4">
                {courseDist.map((item) => {
                  const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <div key={item.course} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200 truncate max-w-[280px]" title={item.course}>
                          {item.course}
                        </span>
                        <div className="flex items-center space-x-2 text-slate-400 font-mono">
                          <span className="font-semibold text-white">{item.count}</span>
                          <span className="text-[11px] text-slate-500">({percent}%)</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.max(percent, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Gender breakdown badges */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-medium">Gender Ratio:</span>
            <div className="flex items-center gap-2">
              {genderDist.map((g) => (
                <span
                  key={g.gender}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium"
                >
                  <span className="text-indigo-400 font-semibold">{g.gender}:</span> {g.count}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recently Added Students (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Recently Added Students
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest student profiles in database
              </p>
            </div>

            <button
              onClick={() => setActiveTab('students')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All
            </button>
          </div>

          {recentStudents.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No recent student records found.
            </p>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {recentStudents.map((student) => (
                <div
                  key={student._id || student.id}
                  className="py-3 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                      {getInitials(student.name)}
                    </div>
                    <div className="min-w-0">
                      <p
                        onClick={() => onViewDetails && onViewDetails(student)}
                        className="text-xs font-bold text-slate-200 hover:text-indigo-400 cursor-pointer truncate transition-colors"
                      >
                        {student.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        {student.studentId} • {student.course?.split(' ')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        student.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {student.status}
                    </span>

                    <button
                      onClick={() => onViewDetails && onViewDetails(student)}
                      className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
