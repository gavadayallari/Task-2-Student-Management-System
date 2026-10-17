import React from 'react';

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  colorTheme = 'indigo',
  subtitle,
  onClick,
}) {
  const colorMap = {
    indigo: {
      border: 'hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
      glow: 'group-hover:shadow-indigo-500/10',
      badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    },
    emerald: {
      border: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
      glow: 'group-hover:shadow-emerald-500/10',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
      glow: 'group-hover:shadow-amber-500/10',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    },
    violet: {
      border: 'hover:border-violet-500/40',
      iconBg: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
      glow: 'group-hover:shadow-violet-500/10',
      badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    },
  };

  const scheme = colorMap[colorTheme] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative group bg-slate-900/70 backdrop-blur-md rounded-2xl p-5 border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        scheme.glow
      } ${scheme.border} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${scheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          {value !== undefined && value !== null ? value : '--'}
        </div>

        {trend && (
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${scheme.badge}`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-2 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
