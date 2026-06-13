import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <div className={`animate-spin rounded-full border-t-emerald-600 border-r-transparent border-b-emerald-600 border-l-transparent ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default Loader;
