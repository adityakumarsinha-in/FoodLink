import React from 'react';
import { Check, Clock, Eye, AlertCircle, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';

const StatusTimeline = ({ status }) => {
  const steps = [
    { key: 'available', label: 'Available', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { key: 'claimed', label: 'Claimed', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { key: 'scheduled', label: 'Scheduled', icon: Eye, color: 'text-sky-600', bg: 'bg-sky-50' },
    { key: 'pickedup', label: 'Picked Up', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, color: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  const getStatusIndex = (currStatus) => {
    const idx = steps.findIndex(s => s.key === currStatus);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="w-full py-4">
      {/* Stepper container */}
      <div className="flex items-center justify-between w-full relative">
        {/* Connection Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-10">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white ring-emerald-50' 
                    : isActive 
                      ? 'bg-white text-emerald-600 ring-emerald-100 border-2 border-emerald-500' 
                      : 'bg-slate-50 text-slate-400 ring-slate-100/50 border border-slate-200'
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
              </div>
              <span 
                className={`text-[10px] sm:text-xs font-semibold mt-2 text-center transition-colors ${
                  isActive ? 'text-emerald-700 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
