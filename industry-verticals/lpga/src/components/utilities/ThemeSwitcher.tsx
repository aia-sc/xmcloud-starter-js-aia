'use client';

import { useEffect, useState, JSX } from 'react';

export const Default = (): JSX.Element | null => {
  const [mounted, setMounted] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mq.matches);

    const onChange = (evt: MediaQueryListEvent) => {
      setIsSystemDark(evt.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.classList.toggle('dark', isSystemDark);
  }, [isSystemDark, mounted]);

  // Defer interactive markup until after mount to avoid hydration mismatch.
  if (!mounted) {
    return <div className="theme-switcher" aria-hidden="true" />;
  }

  return (
    <label className="theme-switcher" htmlFor="theme-switcher">
      <span className="d-none">Switch theme</span>
      <input
        name="theme-switcher"
        id="theme-switcher"
        type="checkbox"
        checked={isSystemDark}
        onChange={() => setIsSystemDark(!isSystemDark)}
      />
      <span className="theme-switcher-slider"></span>
    </label>
  );
};
