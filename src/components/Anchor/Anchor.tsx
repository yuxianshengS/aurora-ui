import React, { useEffect, useRef, useState } from 'react';
import './Anchor.css';

export interface AnchorLink {
  /** 跳转的 #id (不带 #) */
  href: string;
  /** 显示的标题 */
  title: React.ReactNode;
  /** 子链接 (二级) */
  children?: AnchorLink[];
}

export interface AnchorProps {
  /** 锚点列表 */
  items: AnchorLink[];
  /** 距离视口顶部多少 px 视为"已激活"  */
  offsetTop?: number;
  /** 滚动行为 */
  behavior?: ScrollBehavior;
  /** 容器自定义高度 (一般 sticky 用) */
  sticky?: boolean;
  /** sticky 时距视口顶距离 */
  stickyTop?: number;
  /** 滚到对应 section 之前的额外 padding (避免被 navbar 遮) */
  scrollPadding?: number;
  /** 受控当前激活 href */
  active?: string;
  /** 激活变化 */
  onChange?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const flatten = (items: AnchorLink[]): AnchorLink[] => {
  const out: AnchorLink[] = [];
  const walk = (list: AnchorLink[]) => {
    list.forEach((i) => {
      out.push(i);
      if (i.children) walk(i.children);
    });
  };
  walk(items);
  return out;
};

/**
 * 滚动锚点 — 长文档侧栏,跟着 scroll 高亮当前 section,点击平滑滚到对应 #id。
 * 跟 Tabs 不同:Tabs 是切换内容(隐藏其他),这是同一页面内的滚动定位。
 */
const Anchor: React.FC<AnchorProps> = ({
  items,
  offsetTop = 80,
  behavior = 'smooth',
  sticky,
  stickyTop = 80,
  scrollPadding = 16,
  active: ctrlActive,
  onChange,
  className = '',
  style,
}) => {
  const isCtrl = ctrlActive !== undefined;
  const [innerActive, setInnerActive] = useState<string>('');
  const active = isCtrl ? ctrlActive! : innerActive;

  // 标记是否正在程序化滚动 — 期间不要被 scroll 监听抢走 active
  const programmaticRef = useRef(false);
  const programmaticTimer = useRef<number | null>(null);

  useEffect(() => {
    const flat = flatten(items);

    const onScroll = () => {
      if (programmaticRef.current) return;
      let current = '';
      for (const link of flat) {
        const el = document.getElementById(link.href);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top - offsetTop <= 0) {
          current = link.href;
        } else {
          break;
        }
      }
      if (!current && flat.length) current = flat[0].href;
      if (current !== active) {
        if (!isCtrl) setInnerActive(current);
        onChange?.(current);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, offsetTop, active]);

  const onClickLink = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offsetTop - scrollPadding;
    programmaticRef.current = true;
    if (programmaticTimer.current != null) clearTimeout(programmaticTimer.current);
    window.scrollTo({ top, behavior });
    if (!isCtrl) setInnerActive(href);
    onChange?.(href);
    // 滚动结束 ~600ms 后重新交还 scroll listener
    programmaticTimer.current = window.setTimeout(() => {
      programmaticRef.current = false;
    }, 700);
  };

  const renderItems = (list: AnchorLink[], depth = 0): React.ReactNode =>
    list.map((it) => {
      const isActive = active === it.href;
      return (
        <li
          key={it.href}
          className={[
            'au-anchor__item',
            `au-anchor__item--depth-${depth}`,
            isActive ? 'is-active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <a
            href={`#${it.href}`}
            onClick={onClickLink(it.href)}
            className="au-anchor__link"
          >
            {it.title}
          </a>
          {it.children && (
            <ul className="au-anchor__sublist">{renderItems(it.children, depth + 1)}</ul>
          )}
        </li>
      );
    });

  // 计算高亮线位置 (当前 active 的 li.offsetTop)
  const navRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) return setBar(null);
    const link = nav.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return setBar(null);
    setBar({ top: link.offsetTop, height: link.offsetHeight });
  }, [active, items]);

  return (
    <nav
      className={['au-anchor', className].filter(Boolean).join(' ')}
      style={{
        ...(sticky ? { position: 'sticky', top: stickyTop } : {}),
        ...style,
      }}
    >
      <ul ref={navRef} className="au-anchor__list">
        {renderItems(items)}
        {bar && (
          <span
            className="au-anchor__bar"
            style={{ top: bar.top, height: bar.height }}
            aria-hidden
          />
        )}
      </ul>
    </nav>
  );
};

export default Anchor;
