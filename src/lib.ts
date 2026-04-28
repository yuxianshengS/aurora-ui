/**
 * npm 包的 library 入口 — 只导出组件 + 公共 hook, 不包含演示站点 / 路由 / PageBuilder 工具
 *
 * 消费者用法:
 *   import { Button, Table, Flex, useTheme, useFocusTrap } from 'aurora-ux';
 *   import 'aurora-ux/style.css';  // 单独引样式
 */
export * from './components';

// 公共 hooks (let consumers reuse our infra)
export { useTheme, type Theme } from './hooks/useTheme';
export { useFocusTrap } from './hooks/useFocusTrap';

// i18n locale 包
export { zhCN, enUS } from './locale';
export type { Locale } from './locale';

// 主题工具 — generateTheme(brand) → ThemeTokens, applyTheme 写到 :root
export {
  generateTheme,
  applyTheme,
  resetTheme,
  exportThemeCss,
  hexToHsl,
  hslToHex,
} from './utils/generateTheme';
export type { ThemeTokens } from './utils/generateTheme';
