import React, { useEffect, useRef } from 'react';
import './AuroraCursor.css';

export interface AuroraCursorProps {
  /** 渐变色; 数组按顺序作为 stops; 默认极光主题 */
  colors?: string[];
  /** 历史点队列长度 — 越长尾巴越长 */
  length?: number;
  /** 起始线宽 (px) */
  thickness?: number;
  /** 衰减系数 0-1 — 越接近 1 越久不消失 */
  fade?: number;
  /** 整体不透明度 */
  opacity?: number;
  /**
   * mix-blend-mode 强制覆盖. 默认按主题自动切换:
   * 暗色态用 'screen' (彩色变亮), 亮色态不混色 (避免 screen 在白底上抹白成不可见).
   */
  blendMode?: React.CSSProperties['mixBlendMode'];
  /** 完全禁用 (移动端 / 用户偏好) */
  disabled?: boolean;
  /** zIndex, 默认极高保证盖在所有内容之上 */
  zIndex?: number;
}

/**
 * Aurora 招牌:鼠标轨迹拖一道极光尾巴。Canvas 实现, 0 依赖, GPU 友好。
 * 自动尊重 prefers-reduced-motion 与触屏设备(无指针)。
 */
const AuroraCursor: React.FC<AuroraCursorProps> = ({
  colors = ['#22d3ee', '#a855f7', '#ec4899'],
  length = 22,
  thickness = 14,
  fade = 0.86,
  opacity = 0.85,
  blendMode,
  disabled,
  zIndex = 9999,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disabled) return;
    if (typeof window === 'undefined') return;
    // 触屏设备 / 用户偏好减少动效 — 直接不挂
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia?.('(hover: none) and (pointer: coarse)').matches;
    if (reduceMotion || isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const fitCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    fitCanvas();

    const points: Array<{ x: number; y: number; t: number }> = [];
    let mouseX = -1;
    let mouseY = -1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      points.push({ x: mouseX, y: mouseY, t: performance.now() });
      while (points.length > length) points.shift();
    };
    const onLeave = () => {
      // 鼠标离开页面立刻清空尾巴, 不留任何痕迹
      mouseX = -1;
      mouseY = -1;
      points.length = 0;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    const onResize = () => fitCanvas();
    window.addEventListener('resize', onResize);

    const render = () => {
      // 用 fade alpha 让上一帧的痕迹平滑衰减(残影感)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${1 - fade})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'source-over';

      // 鼠标停顿(>40ms 没新点)时, 每帧从队首移除一个点, 让尾巴自然缩短消失
      // 不这么做的话, 静止的 points 数组每帧都被 stroke 一遍, 衰减永远追不上 → 残留
      const now = performance.now();
      const lastPoint = points[points.length - 1];
      if (!lastPoint || now - lastPoint.t > 40) {
        if (points.length > 0) points.shift();
      }

      if (points.length >= 2) {
        // 沿点队列画一条多色 stroke 弧
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const t = i / points.length;
          const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
          colors.forEach((c, ci) => grad.addColorStop(ci / Math.max(1, colors.length - 1), c));
          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = thickness * (0.4 + t * 0.6);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = colors[ci(colors.length, t)];
          ctx.shadowBlur = 18;
          ctx.globalAlpha = opacity * t;
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      // 在最新点画一个稍亮的圆点
      if (mouseX >= 0) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, thickness);
        grad.addColorStop(0, `${colors[0]}cc`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, thickness, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, length, thickness, fade, opacity, colors.join('|')]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="au-aurora-cursor"
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        // 用户显式传 blendMode 时走内联覆盖, 否则交给 CSS 按主题切
        ...(blendMode ? { mixBlendMode: blendMode } : null),
      }}
    />
  );
};

// 取颜色队列里和 t 对应的颜色, 处理边界
const ci = (n: number, t: number) => Math.min(n - 1, Math.max(0, Math.floor(t * (n - 1))));

export default AuroraCursor;
