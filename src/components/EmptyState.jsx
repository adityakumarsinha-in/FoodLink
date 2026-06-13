import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  title = 'No listings found', 
  message = 'Check back later or change your filters.', 
  icon: Icon = Inbox, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-2xl shadow-xs animate-fade-in">
      <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 mb-4">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-1">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
