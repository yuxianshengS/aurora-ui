import React, { useEffect, useRef, useState } from 'react';
import './Motion.css';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface RevealProps {
  /** 滚动到视口时触发 fade + slide */
  children: React.ReactNode;
  /** 滑入方向 */
  direction?: RevealDirection;
  /** 平移距离 (px) */
  distance?: number;
  /** 进场延迟 (ms) — 多个 Reveal 错峰常用 */
  delay?: number;
  /** 持续时长 (ms) */
  duration?: number;
  /** 触发的视口比例 (0-1) */
  threshold?: number;
  /** 是否一次性 (默认 true) */
  once?: boolean;
  /** 自定义元素 (默认 div, 可改成 'section' 'article' 'span' 等) */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  distance = 24,
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  as: Tag = 'div',
  className = '',
  style,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            if (once) io.disconnect();
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  const offsetX = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
  const offsetY = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

  const enterStyle: React.CSSProperties = {
    transition: `opacity ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translate3d(0,0,0)' : `translate3d(${offsetX}px, ${offsetY}px, 0)`,
    willChange: 'opacity, transform',
    ...style,
  };

  const Element = Tag as React.ElementType;
  return (
    <Element
      ref={ref}
      className={['au-reveal', revealed ? 'is-revealed' : '', className].filter(Boolean).join(' ')}
      style={enterStyle}
    >
      {children}
    </Element>
  );
};

export default Reveal;
