import React, { useEffect, useRef, useState } from 'react';
import './Motion.css';

export interface StaggerProps {
  /** 子元素会被错峰 fade-up;只看 React.Children 顶层,不递归 */
  children: React.ReactNode;
  /** 子元素错峰间隔 (ms) */
  stagger?: number;
  /** 单项进场时长 (ms) */
  duration?: number;
  /** 整体起始延迟 (ms) */
  delay?: number;
  /** 单项位移 (px) */
  distance?: number;
  /** 触发视口比例 */
  threshold?: number;
  /** 一次性触发 */
  once?: boolean;
  /** 容器 tag */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

const Stagger: React.FC<StaggerProps> = ({
  children,
  stagger = 60,
  duration = 500,
  delay = 0,
  distance = 18,
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

  const items = React.Children.toArray(children);
  const Element = Tag as React.ElementType;
  return (
    <Element
      ref={ref}
      className={['au-stagger', revealed ? 'is-revealed' : '', className].filter(Boolean).join(' ')}
      style={style}
    >
      {items.map((child, i) => (
        <div
          key={(child as { key?: React.Key })?.key ?? i}
          className="au-stagger__item"
          style={{
            transition: `opacity ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${
              delay + i * stagger
            }ms, transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay + i * stagger}ms`,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translate3d(0,0,0)' : `translate3d(0, ${distance}px, 0)`,
            willChange: 'opacity, transform',
          }}
        >
          {child}
        </div>
      ))}
    </Element>
  );
};

export default Stagger;
