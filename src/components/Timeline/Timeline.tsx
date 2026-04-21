import React from 'react';
import './Timeline.css';

export type TimelineColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'
  | 'default';

export interface TimelineItem {
  key?: string | number;
  /** built-in status color or any css color string */
  color?: TimelineColor | string;
  /** custom dot/icon (overrides the color circle) */
  dot?: React.ReactNode;
  /** opposite-side label — often a timestamp or short status word */
  label?: React.ReactNode;
  /** main content */
  children?: React.ReactNode;
  /** pulse the dot to indicate an in-progress node */
  loading?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  /** which side of the axis content lives on */
  mode?: 'left' | 'right' | 'alternate';
  /** reverse the display order */
  reverse?: boolean;
  /**
   * append a ghost "in progress" item at the end.
   * `true` shows just a pulsing dot; a node renders as the content.
   */
  pending?: React.ReactNode | boolean;
  /** override the pending item's dot */
  pendingDot?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const BUILTIN = new Set<string>([
  'primary', 'success', 'warning', 'danger', 'gray', 'default',
]);

const Timeline: React.FC<TimelineProps> = ({
  items,
  mode = 'left',
  reverse,
  pending,
  pendingDot,
  className,
  style,
}) => {
  const list: TimelineItem[] = reverse ? [...items].reverse() : [...items];

  if (pending) {
    const pendingItem: TimelineItem = {
      key: '__au_pending__',
      color: 'gray',
      loading: true,
      dot: pendingDot,
      children: typeof pending === 'boolean' ? null : pending,
    };
    if (reverse) list.unshift(pendingItem);
    else list.push(pendingItem);
  }

  const hasLabel = list.some((i) => i.label !== undefined && i.label !== null);

  return (
    <ul
      className={[
        'au-timeline',
        `au-timeline--${mode}`,
        hasLabel ? 'au-timeline--has-label' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {list.map((item, i) => {
        const isLast = i === list.length - 1;
        const color = item.color ?? 'primary';
        const isBuiltin = typeof color === 'string' && BUILTIN.has(color);
        // alternate: even index = left content, odd = right content
        const side =
          mode === 'alternate' ? (i % 2 === 0 ? 'left' : 'right') : mode;

        const dotStyle =
          !isBuiltin && !item.dot
            ? ({ background: color, ['--au-timeline-dot' as string]: color } as React.CSSProperties)
            : undefined;

        return (
          <li
            key={item.key ?? i}
            className={[
              'au-timeline__item',
              `au-timeline__item--${side}`,
              isLast ? 'is-last' : '',
              item.loading ? 'is-loading' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="au-timeline__label">{item.label}</div>
            <div className="au-timeline__axis">
              <span
                className={[
                  'au-timeline__dot',
                  isBuiltin ? `au-timeline__dot--${color}` : '',
                  item.dot ? 'au-timeline__dot--custom' : '',
                ].filter(Boolean).join(' ')}
                style={dotStyle}
              >
                {item.dot}
              </span>
              {!isLast && <span className="au-timeline__tail" />}
            </div>
            <div className="au-timeline__content">{item.children}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
