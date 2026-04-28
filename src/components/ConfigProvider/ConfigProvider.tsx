import React, { createContext, useContext, useEffect, useMemo } from 'react';
import zhCN from '../../locale/zh_CN';
import type { Locale } from '../../locale/types';

export interface ConfigContextShape {
  locale: Locale;
  /** 全局主色 — 写到 :root 的 --au-primary, 后续可扩展更多 token */
  primaryColor?: string;
}

const defaultCtx: ConfigContextShape = {
  locale: zhCN,
};

export const ConfigContext = createContext<ConfigContextShape>(defaultCtx);

export interface ConfigProviderProps {
  /** 国际化包; 默认 zhCN */
  locale?: Locale;
  /**
   * 全局主色 — 写到 document.documentElement 的 CSS 变量上 (而非包裹 div),
   * 这样 portal 渲染的 Modal / Drawer / Tooltip / Tour 等弹层也能读到。
   */
  primaryColor?: string;
  children?: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  locale = zhCN,
  primaryColor,
  children,
}) => {
  const ctx = useMemo<ConfigContextShape>(
    () => ({ locale, primaryColor }),
    [locale, primaryColor],
  );

  // 把 primaryColor 写到 :root, 既覆盖整页(包括 portal 弹层),
  // 又不引入额外的 DOM wrapper 避免破坏外层 flex/100vh 布局。
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (primaryColor == null) return;
    const root = document.documentElement;
    const prev = root.style.getPropertyValue('--au-primary');
    root.style.setProperty('--au-primary', primaryColor);
    return () => {
      if (prev) root.style.setProperty('--au-primary', prev);
      else root.style.removeProperty('--au-primary');
    };
  }, [primaryColor]);

  return <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>;
};

/** 内部组件用 — 拿到当前 locale, 不被包裹时返回默认 zhCN */
export const useLocale = (): Locale => {
  return useContext(ConfigContext).locale;
};

/** 拿到完整 config (locale + primaryColor 等) */
export const useConfig = (): ConfigContextShape => useContext(ConfigContext);

export default ConfigProvider;
