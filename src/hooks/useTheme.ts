import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'aurora-theme';
/** 主题切换缓动时长 — 跟 styles/motion.css 里 [data-theme-transition] 的 transition 时长保持一致 */
const TRANSITION_DURATION = 280;

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 模块级 — 只在第一次 applyTheme 时跳过缓动 (初始 mount 不该出现 fade-in)
let isInitialApply = true;
let transitionTimer: number | null = null;

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // 只在用户主动切换 + 未关闭动效时, 给 DOM 挂 transition flag
  if (!isInitialApply && !reduceMotion) {
    root.setAttribute('data-theme-transition', '');
    if (transitionTimer != null) clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      root.removeAttribute('data-theme-transition');
      transitionTimer = null;
    }, TRANSITION_DURATION);
  }
  isInitialApply = false;
  root.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  return { theme, setTheme, toggleTheme };
}
