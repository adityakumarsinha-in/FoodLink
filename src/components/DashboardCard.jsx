import React from 'react';

const DashboardCard = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  color = 'green' // green, orange, blue, purple, red
}) => {
  const colorSchemes = {
    green: {
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-200',
      badgeBg: 'bg-emerald-100/50 text-emerald-800'
    },
    orange: {
      bg: 'bg-amber-50/50',
      text: 'text-amber-600',
      border: 'hover:border-amber-200',
      badgeBg: 'bg-amber-100/50 text-amber-800'
    },
    blue: {
      bg: 'bg-sky-50/50',
      text: 'text-sky-600',
      border: 'hover:border-sky-200',
      badgeBg: 'bg-sky-100/50 text-sky-800'
    },
    purple: {
      bg: 'bg-violet-50/50',
      text: 'text-violet-600',
      border: 'hover:border-violet-200',
      badgeBg: 'bg-violet-100/50 text-violet-800'
    },
    red: {
      bg: 'bg-rose-50/50',
      text: 'text-rose-600',
      border: 'hover:border-rose-200',
      badgeBg: 'bg-rose-100/50 text-rose-800'
    }
  };

  const currentScheme = colorSchemes[color] || colorSchemes.green;

  return (
    <div className={`p-6 bg-white border border-slate-100 rounded-2xl shadow-xs transition-all duration-300 ${currentScheme.border} hover:shadow-md hover:-translate-y-0.5 flex items-start justify-between`}>
      <div className="space-y-2">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">{title}</span>
        <h3 className="text-3xl font-bold text-slate-800 font-display tracking-tight">{value}</h3>
        {subtext && (
          <p className="text-slate-500 text-xs font-medium flex items-center">
            {subtext}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl shrink-0 ${currentScheme.bg} ${currentScheme.text}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
