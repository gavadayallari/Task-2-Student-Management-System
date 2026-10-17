import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Server,
  Database,
  Globe,
  Layers,
  CheckCircle2,
  Code2,
  FileText,
  ShieldAlert,
  Terminal,
} from 'lucide-react';

export default function AboutPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/dashboard/stats',
      desc: 'Retrieves total students, active/inactive counts, department breakdown, and recent records',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      method: 'GET',
      path: '/api/students',
      desc: 'Retrieves paginated student records with optional search, course, and status query filters',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      method: 'GET',
      path: '/api/students/:id',
      desc: 'Retrieves single student document by MongoDB ObjectId or unique Student ID',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      method: 'POST',
      path: '/api/students',
      desc: 'Creates a new student record with schema validation and duplicate ID/email prevention',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      method: 'PUT',
      path: '/api/students/:id',
      desc: 'Updates an existing student profile, revalidates fields, and persists changes to MongoDB',
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    {
      method: 'DELETE',
      path: '/api/students/:id',
      desc: 'Permanently removes a student record from the database after user confirmation',
      badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    },
    {
      method: 'GET',
      path: '/api/health',
      desc: 'Returns system uptime and real-time MongoDB connection status',
      badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
  ];

  const features = [
    'Complete CRUD operations (Add, View, Update, Delete) with MongoDB persistence',
    'Real-time search across student names, student IDs, emails, and departments',
    'Dynamic multi-criteria filtering by Course/Department and Active/Inactive status',
    'Paginated data presentation with customizable page size (5, 10, 20, 50)',
    'Dual view modes: Comprehensive Table View & Modern Grid Card View',
    'One-click CSV Data Export for academic administration records',
    'Interactive Dashboard with metrics, department distribution charts, and recent enrollments',
    'Strict input validation on both frontend forms and backend REST APIs',
    'Unique student ID & email duplicate collision prevention in database',
    'Confirmation modals for safe deletions with visual feedback',
    'Toast notification system for immediate feedback on all CRUD operations',
    'Fully responsive layout optimized for mobile, tablet, laptop, and desktop viewports',
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auspify Technologies Full Stack Development Internship • Task 2</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            StudentHub – Student Management System
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            A production-ready Full Stack web application engineered to manage student records, department enrollments, and academic administration. Designed with clean modular code, robust REST APIs, and modern responsive UI.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-medium">
              Author: <strong className="text-white">Yallari Gavada</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-medium">
              Frontend: <strong className="text-indigo-400">React + Vite + Tailwind CSS</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-medium">
              Backend: <strong className="text-emerald-400">Node.js + Express.js</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-medium">
              Database: <strong className="text-amber-400">MongoDB + Mongoose ODM</strong>
            </span>
          </div>
        </div>

        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tech Stack Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-3">
            <Globe className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Frontend Layer</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built using React 18, Vite tooling, Tailwind CSS utility styling, Lucide icons, responsive layout breakpoints, and clean component separation.
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3">
            <Server className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Backend REST API</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built on Node.js and Express.js with modular controller routes, CORS integration, centralized error handling, and data validation middleware.
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Database & ODM</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            MongoDB with Mongoose ODM schema validations, compound search indexes, uniqueness constraints on student IDs, and aggregation pipelines.
          </p>
        </div>
      </div>

      {/* REST API Reference */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Code2 className="w-4 h-4" />
          <span>Backend REST API Endpoints Reference</span>
        </div>

        <div className="divide-y divide-slate-800/60 overflow-x-auto">
          {endpoints.map((ep) => (
            <div key={ep.path + ep.method} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${ep.badge}`}>
                  {ep.method}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-200">
                  {ep.path}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-lg">
                {ep.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Checklist */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Completed Requirements & Features</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
