import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

const queryFocusable = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.offsetParent !== null,
  );

/**
 * 在 active=true 时把焦点锁在 ref 容器内,Tab / Shift+Tab 循环移动;
 * 关闭时把焦点还给打开前的元素。
 *
 * 用法:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useFocusTrap(ref, isOpen);
 *   return <div ref={ref}>...</div>;
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const root = containerRef.current;
    if (!root) return;

    // 入场后聚焦第一个可聚焦元素 (next tick 让 portal 完成挂载)
    const t = window.setTimeout(() => {
      const items = queryFocusable(root);
      const target = items[0] ?? root;
      // 容器本身需要 tabIndex 才能 focus
      if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '-1');
      (target as HTMLElement).focus({ preventScroll: true });
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = queryFocusable(root);
      if (items.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (activeEl === first || !root.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !root.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      // 还原焦点 (容器已经卸载, 让原元素重新获得焦点)
      const prev = previouslyFocused.current;
      previouslyFocused.current = null;
      if (prev && typeof prev.focus === 'function') {
        try {
          prev.focus({ preventScroll: true });
        } catch {
          /* noop */
        }
      }
    };
  }, [active, containerRef]);
}
