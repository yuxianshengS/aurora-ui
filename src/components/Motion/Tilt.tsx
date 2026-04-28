import React, { useEffect, useRef } from 'react';
import './Motion.css';

export interface TiltProps {
  /** 任意子元素;鼠标在内部移动时父容器会做 X/Y 旋转 */
  children: React.ReactNode;
  /** 最大倾斜角度 (度), 默认 8 */
  intensity?: number;
  /** perspective (px), 默认 1000 */
  perspective?: number;
  /** 鼠标位置高光 sheen */
  sheen?: boolean;
  /** 容器 tag */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

const Tilt: React.FC<TiltProps> = ({
  children,
  intensity = 8,
  perspective = 1000,
  sheen = true,
  as: Tag = 'div',
  className = '',
  style,
}) => {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * intensity;
        const ry = (x - 0.5) * intensity;
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty('--au-tilt-mx', `${x * 100}%`);
        el.style.setProperty('--au-tilt-my', `${y * 100}%`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      inner.style.transform = '';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, [intensity]);

  const rootStyle: React.CSSProperties = {
    perspective,
    ...style,
  };

  const Element = Tag as React.ElementType;
  return (
    <Element
      ref={ref}
      className={['au-tilt', className].filter(Boolean).join(' ')}
      style={rootStyle}
    >
      <div ref={innerRef} className="au-tilt__inner">
        {children}
      </div>
      {sheen && <span className="au-tilt__sheen" aria-hidden />}
    </Element>
  );
};

export default Tilt;
