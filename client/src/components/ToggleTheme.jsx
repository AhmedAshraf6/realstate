'use client';
import React, { useEffect, useState } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const themes = {
  dark: 'dark',
  light: 'light',
};
const getThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('theme') || themes.dark;
  }
};
export default function ToggleTheme() {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const handleTheme = () => {
    const { dark, light } = themes;
    const newTheme = theme === dark ? light : dark;
    setTheme(newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <label className='swap swap-rotate'>
      <input type='checkbox' onChange={handleTheme} />
      <BsSunFill className='swap-on h-4 w-4' />
      <BsMoonFill className='swap-off h-4 w-4' />
    </label>
  );
}
