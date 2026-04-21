import React, { useState } from 'react';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** 气泡内容 */
  title: React.ReactNode;
  /** 触发元素 */
  children: React.ReactNode;
  /** 位置 */
  placement?: TooltipPlacement;
  /** 气泡背景色 */
  background?: string;
  /** 气泡文字色 */
  color?: string;
  /** 受控显示 */
  open?: boolean;
  /** 非受控默认显示 */
  defaultOpen?: boolean;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 打开时是否播放抖动动画 */
  shake?: boolean;
  /** 气泡最大宽度 */
  maxWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  background,
  color,
  open,
  defaultOpen = false,
  arrow = true,
  shake = false,
  maxWidth,
  className = '',
  style,
}) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const visible = isControlled ? open! : innerOpen;

  const show = () => {
    if (!isControlled) setInnerOpen(true);
  };
  const hide = () => {
    if (!isControlled) setInnerOpen(false);
  };

  const rootStyle: React.CSSProperties = {
    ...(background ? { ['--au-tooltip-bg' as string]: background } : {}),
    ...(color ? { ['--au-tooltip-color' as string]: color } : {}),
    ...(maxWidth
      ? { ['--au-tooltip-max-w' as string]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
      : {}),
    ...style,
  };

  return (
    <span
      className={[
        'au-tooltip',
        `au-tooltip--${placement}`,
        visible ? 'is-open' : '',
        shake ? 'au-tooltip--shake' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span className="au-tooltip__trigger">{children}</span>
      <span className="au-tooltip__bubble" role="tooltip">
        {title}
        {arrow && <span className="au-tooltip__arrow" aria-hidden />}
      </span>
    </span>
  );
};

export default Tooltip;
