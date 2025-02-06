'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'night'

  useEffect(() => {
    // Đảm bảo khi load trang, theme được áp dụng từ localStorage (nếu có)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Lưu theme vào localStorage khi thay đổi
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark', 'night');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <select value={theme} onChange={handleChange} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="night">Night Mode</option>
      </select>
    </div>
  );
}
