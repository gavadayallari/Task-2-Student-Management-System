import React, { useState } from 'react';
import {
  Menu,
  Search,
  Plus,
  RefreshCw,
  Bell,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  setIsMobileOpen,
  onRefresh,
  isRefreshing,
  onGlobalSearch,
}) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onGlobalSearch) {
      onGlobalSearch(searchInput);
      setActiveTab('students');
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Admin Dashboard', subtitle: 'Overview of student enrollments & metrics' };
      case 'students':
        return { title: 'Student Directory', subtitle: 'View, search, filter, and manage student records' };
      case 'add-student':
        return { title: 'Register New Student', subtitle: 'Fill student personal & academic details' };
      case 'student-details':
        return { title: 'Student Profile Dossier', subtitle: 'Detailed student record and actions' };
      case 'about':
        return { title: 'Project & REST API Docs', subtitle: 'Architecture, endpoints, and task submission info' };
      default:
        return { title: 'StudentHub', subtitle: 'Student Management System' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center space-x-3.5">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            {title}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick Search + Actions + User Profile */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5">
        {/* Quick Search form */}
        <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Quick search by name, ID..."
            className="w-52 lg:w-64 pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2 pointer-events-none" />
        </form>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh data from MongoDB"
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5 text-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden xl:inline text-xs font-medium">Refresh</span>
          </button>
        )}

        {/* Quick Add Student Button */}
        {activeTab !== 'add-student' && (
          <button
            onClick={() => setActiveTab('add-student')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Student</span>
          </button>
        )}

        {/* Admin User Chip */}
        <div className="flex items-center pl-2 sm:pl-3 border-l border-slate-800/80 space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30 shadow-sm">
            YG
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">Yallari Gavada</p>
            <p className="text-[10px] text-slate-400 leading-tight">Full Stack Intern</p>
          </div>
        </div>
      </div>
    </header>
  );
}
