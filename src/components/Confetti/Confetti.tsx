import React, { useEffect, useImperativeHandle, useRef } from 'react';

export interface ConfettiOptions {
  /** 粒子数量, 默认 120 */
  count?: number;
  /** 粒子色板, 默认极光色 */
  colors?: string[];
  /** 散开角度 (度), 默认 70 */
  spread?: number;
  /** 初速度 (像素), 默认 30 */
  velocity?: number;
  /** 重力, 默认 0.6 */
  gravity?: number;
  /** 衰减系数 0-1, 默认 0.94 — 越接近 1 飞越久 */
  decay?: number;
  /** 持续 ms 上限 (兜底), 默认 2400 */
  duration?: number;
  /** 起爆点 — 'center' / 'top' / 'bottom-left' / 'click-anchor' / { x, y } */
  origin?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | { x: number; y: number };
  /** 形状 */
  shapes?: Array<'circle' | 'rect' | 'star'>;
}

export interface ConfettiHandle {
  /** 命令式触发: confettiRef.current?.fire({ count: 200 }) */
  fire: (opts?: ConfettiOptions) => void;
}

export interface ConfettiProps extends ConfettiOptions {
  /** 声明式触发 — 任何变化都会 fire 一次 (常见: trigger={successCount}) */
  trigger?: unknown;
  /** zIndex */
  zIndex?: number;
}

const DEFAULT_COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#fb923c', '#10b981', '#facc15'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  color: string;
  shape: 'circle' | 'rect' | 'star';
  alpha: number;
  shrink: number;
}

const resolveOrigin = (
  o: ConfettiOptions['origin'],
  vw: number,
  vh: number,
): [number, number] => {
  if (!o || o === 'center') return [vw / 2, vh / 2];
  if (typeof o === 'object') return [o.x, o.y];
  if (o === 'top') return [vw / 2, vh * 0.1];
  if (o === 'bottom') return [vw / 2, vh * 0.9];
  if (o === 'left') return [vw * 0.1, vh / 2];
  if (o === 'right') return [vw * 0.9, vh / 2];
  return [vw / 2, vh / 2];
};

const drawShape = (
  ctx: CanvasRenderingContext2D,
  p: Particle,
) => {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle = p.color;
  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.shape === 'rect') {
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
  } else {
    // star
    const n = 5;
    const r = p.size / 2;
    ctx.beginPath();
    for (let i = 0; i < n * 2; i++) {
      const ang = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 === 0 ? r : r * 0.45;
      const x = Math.cos(ang) * rr;
      const y = Math.sin(ang) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
};

const Confetti = React.forwardRef<ConfettiHandle, ConfettiProps>(
  ({ trigger, zIndex = 9998, ...defaults }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const lastFireAtRef = useRef<number>(0);

    const fire = (opts: ConfettiOptions = {}) => {
      const o = { ...defaults, ...opts };
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const [ox, oy] = resolveOrigin(o.origin, vw, vh);
      const count = o.count ?? 120;
      const colors = o.colors ?? DEFAULT_COLORS;
      const shapes = o.shapes ?? ['rect', 'circle', 'star'];
      const spread = ((o.spread ?? 70) * Math.PI) / 180;
      const velocity = o.velocity ?? 30;

      const ps: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
        const v = velocity * (0.4 + Math.random() * 0.7);
        ps.push({
          x: ox,
          y: oy,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.4,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          alpha: 1,
          shrink: 0.992 + Math.random() * 0.006,
        });
      }
      particlesRef.current.push(...ps);
      lastFireAtRef.current = performance.now();

      const gravity = o.gravity ?? 0.6;
      const decay = o.decay ?? 0.94;
      const duration = o.duration ?? 2400;

      cancelAnimationFrame(rafRef.current);
      const step = () => {
        ctx.clearRect(0, 0, vw, vh);
        const now = performance.now();
        const elapsed = now - lastFireAtRef.current;
        const arr = particlesRef.current;
        for (let i = arr.length - 1; i >= 0; i--) {
          const p = arr[i];
          p.vx *= decay;
          p.vy *= decay;
          p.vy += gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          p.alpha *= 0.992;
          p.size *= p.shrink;
          drawShape(ctx, p);
          if (p.alpha < 0.04 || p.y > vh + 40 || p.size < 1) {
            arr.splice(i, 1);
          }
        }
        if (arr.length === 0 && elapsed > duration) {
          ctx.clearRect(0, 0, vw, vh);
          return;
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    useImperativeHandle(ref, () => ({ fire }), []);

    // 声明式 trigger
    useEffect(() => {
      if (trigger == null) return;
      // 第一次 mount 时也触发(用 trigger 切换习惯)
      fire();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    // 卸载清理
    useEffect(
      () => () => {
        cancelAnimationFrame(rafRef.current);
        particlesRef.current = [];
      },
      [],
    );

    return (
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex,
        }}
      />
    );
  },
);
Confetti.displayName = 'Confetti';

export default Confetti;
