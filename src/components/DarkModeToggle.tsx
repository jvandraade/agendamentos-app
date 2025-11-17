import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-slate-700 z-50"
      aria-label="Alternar tema"
    >
      {isDark ? (
        <MdLightMode className="text-2xl text-yellow-500" />
      ) : (
        <MdDarkMode className="text-2xl text-slate-700" />
      )}
    </button>
  );
};
