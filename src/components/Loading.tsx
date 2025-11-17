import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-slate-700 rounded-full`}
        ></div>
        <div
          className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0`}
        ></div>
      </div>
      {text && <p className="text-sm text-gray-600 dark:text-slate-400 animate-pulse">{text}</p>}
    </div>
  );
};
