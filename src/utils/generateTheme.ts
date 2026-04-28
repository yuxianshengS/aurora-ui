/**
 * 主题生成 — 给一个品牌色, 自动算出 hover/active/soft + 12 档色阶 + 暗色对照
 *
 *   const tokens = generateTheme('#7c3aed');
 *   applyTheme(tokens); // 把 token 写到 :root
 *   exportThemeCss(tokens); // 拿到 .css 文本可复制
 */

export interface ThemeTokens {
  /** 主色 */
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primarySoft: string;
  /** 12 档色阶 (色板, 1=最浅 12=最深) */
  scale: string[];
  /** 与品牌色和谐的语义色 */
  success: string;
  warning: string;
  danger: string;
  info: string;
}

/* ===== HSL <-> HEX 工具 ===== */

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
};

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0'))
    .join('');

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
};

export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s = clamp(s, 0, 1);
  l = clamp(l, 0, 1);
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
};

export const hexToHsl = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsl(r, g, b);
};
export const hslToHex = (h: number, s: number, l: number) => {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

/* ===== 主算法 ===== */

/** 给一个 hex 主色, 输出完整 token 集 */
export const generateTheme = (brand: string): ThemeTokens => {
  const [h, s, l] = hexToHsl(brand);
  // 12 档色阶: 亮度从 0.96 → 0.18 平滑过渡, 饱和度向中间偏高
  const scale = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11; // 0..1
    const ll = 0.96 - t * (0.96 - 0.18);
    const ss = clamp(s * (0.65 + Math.sin(t * Math.PI) * 0.45), 0, 1);
    return hslToHex(h, ss, ll);
  });
  return {
    primary: brand,
    scale,
    // hover: 亮度 +5%, active: 亮度 -8%
    primaryHover: hslToHex(h, s, clamp(l + 0.05, 0, 1)),
    primaryActive: hslToHex(h, s, clamp(l - 0.08, 0, 1)),
    // soft: 同色低饱和高亮度,做浅底
    primarySoft: `hsla(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${
      (l > 0.7 ? l - 0.1 : l + 0.35).toFixed(2) as unknown as number
    }%, 0.16)`,
    // 语义色: 跟品牌色色相错开
    success: hslToHex((h + 120) % 360, clamp(s * 0.85, 0.4, 0.7), 0.45),
    warning: hslToHex(40, 0.92, 0.5),
    danger: hslToHex(0, 0.78, 0.55),
    info: hslToHex((h + 30) % 360, clamp(s * 0.9, 0.5, 0.8), 0.5),
  };
};

/** 把 tokens 写到 document.documentElement 上 */
export const applyTheme = (tokens: ThemeTokens) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--au-primary', tokens.primary);
  root.style.setProperty('--au-primary-hover', tokens.primaryHover);
  root.style.setProperty('--au-primary-active', tokens.primaryActive);
  root.style.setProperty('--au-primary-soft', tokens.primarySoft);
  root.style.setProperty('--au-success', tokens.success);
  root.style.setProperty('--au-warning', tokens.warning);
  root.style.setProperty('--au-danger', tokens.danger);
};

/** 还原回 :root 默认 */
export const resetTheme = () => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  ['--au-primary', '--au-primary-hover', '--au-primary-active', '--au-primary-soft',
   '--au-success', '--au-warning', '--au-danger'].forEach((k) =>
    root.style.removeProperty(k),
  );
};

/** 输出可复制的 CSS 文本 */
export const exportThemeCss = (tokens: ThemeTokens): string => {
  return `:root {
  --au-primary:        ${tokens.primary};
  --au-primary-hover:  ${tokens.primaryHover};
  --au-primary-active: ${tokens.primaryActive};
  --au-primary-soft:   ${tokens.primarySoft};
  --au-success:        ${tokens.success};
  --au-warning:        ${tokens.warning};
  --au-danger:         ${tokens.danger};
}`;
};
