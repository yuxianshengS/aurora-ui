import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
  /** 进入视口多少比例算"可见" (0-1, 默认 0.15) */
  threshold?: number;
  /** rootMargin, 同 IntersectionObserver, 例 '-100px 0px' 让触发提前 */
  rootMargin?: string;
  /** 只触发一次 (默认 true). false 时进出视口反复触发 */
  once?: boolean;
}

/**
 * 检测元素是否在视口内 — 滚动入场动画的基础 hook.
 *
 * @example
 * const [ref, inView] = useInView();
 * <div ref={ref}>{inView ? '已可见' : '滚我下来'}</div>
 *
 * @example 反复触发
 * const [ref, inView] = useInView({ once: false });
 *
 * SSR 友好: 服务端默认 inView=false (匹配后续客户端首帧, 避免水合不一致).
 * 不支持 IntersectionObserver 时 (老浏览器) fallback 直接为 true.
 */
export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      // 老浏览器无 IO 支持 — 直接显示, 别让 UI 卡死
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
