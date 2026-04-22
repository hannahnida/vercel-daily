'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeController: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  // Sync the DOM attribute whenever isDark changes (external system update only)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.setAttribute('data-theme', newIsDark ? 'dark' : 'light');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <label className="flex cursor-pointer gap-2 h-5">
      <Sun size={18} className="self-center text-neutral dark:text-neutral-50" />
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <Moon size={18} className="self-center" />
    </label>
  );
};

export default ThemeController;
