import React from 'react';
import {
  Search,
  Filter,
  X,
  ArrowUpDown,
  LayoutGrid,
  Table as TableIcon,
  Download,
  RotateCcw,
} from 'lucide-react';

export const COURSES_LIST = [
  'All',
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Business Administration (MBA)',
];

export default function FilterBar({
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
  viewMode,
  setViewMode,
  onClearFilters,
  totalResults,
  onExportCSV,
}) {
  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCourse !== 'All' ||
    selectedStatus !== 'All' ||
    sortBy !== 'createdAt' ||
    sortOrder !== 'desc';

  const activeFiltersCount =
    (search.trim() !== '' ? 1 : 0) +
    (selectedCourse !== 'All' ? 1 : 0) +
    (selectedStatus !== 'All' ? 1 : 0) +
    (sortBy !== 'createdAt' || sortOrder !== 'desc' ? 1 : 0);

  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800/80 mb-6 space-y-4 shadow-xl">
      {/* Top Row: Search and View Mode / Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, student ID, or email..."
            className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-white p-0.5 rounded-md"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Switcher & Export */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Export to CSV */}
          {onExportCSV && (
            <button
              onClick={onExportCSV}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              title="Export students to CSV"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Row: Dropdowns and Clear Button */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60">
        {/* Course Filter */}
        <div className="flex items-center space-x-2 min-w-[170px]">
          <span className="text-xs text-slate-400 font-medium">Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="flex-1 py-1.5 px-2.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {COURSES_LIST.map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-slate-200">
                {c === 'All' ? 'All Departments' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-1.5 px-2.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All" className="bg-slate-900 text-slate-200">All Statuses</option>
            <option value="Active" className="bg-slate-900 text-emerald-400">Active</option>
            <option value="Inactive" className="bg-slate-900 text-amber-400">Inactive</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-1.5 px-2.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="createdAt" className="bg-slate-900 text-slate-200">Date Added</option>
            <option value="name" className="bg-slate-900 text-slate-200">Full Name</option>
            <option value="studentId" className="bg-slate-900 text-slate-200">Student ID</option>
            <option value="enrollmentDate" className="bg-slate-900 text-slate-200">Enrollment Date</option>
            <option value="course" className="bg-slate-900 text-slate-200">Course</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white"
            title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Filters ({activeFiltersCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
