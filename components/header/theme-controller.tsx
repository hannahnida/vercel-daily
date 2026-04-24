'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'silk' | 'dark';

const THEME_STORAGE_KEY = 'theme';

export default function ThemeController() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'dark' ? 'dark' : 'silk');
  }, []);


  if (theme === null) {
    return <span className="inline-block w-12 h-6" aria-hidden="true" />;
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    const next: Theme = isDark ? 'silk' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage disabled
    }
  };

  return (
    <label className="toggle text-base-content" aria-label="Toggle dark mode">
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleToggle}
        className="theme-controller"
      />
      <Sun size={16} aria-hidden="true" />
      <Moon size={16} aria-hidden="true" />
    </label>
  );
}