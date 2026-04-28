import React from 'react';
import './Card.css';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      extra,
      bordered = true,
      hoverable = false,
      className = '',
      style,
      children,
      onClick,
    },
    ref,
  ) => {
    const isInteractive = typeof onClick === 'function';
    const classes = [
      'au-card',
      bordered ? 'au-card--bordered' : '',
      hoverable ? 'au-card--hoverable' : '',
      isInteractive ? 'au-card--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    // 当卡片可点击时, 给它按钮语义 + 键盘可达
    const a11yProps: React.HTMLAttributes<HTMLDivElement> = isInteractive
      ? {
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (e.currentTarget as HTMLElement).click();
            }
          },
        }
      : {};
    return (
      <div ref={ref} className={classes} style={style} onClick={onClick} {...a11yProps}>
        {(title || extra) && (
          <div className="au-card__head">
            <div className="au-card__title">{title}</div>
            {extra && <div className="au-card__extra">{extra}</div>}
          </div>
        )}
        <div className="au-card__body">{children}</div>
      </div>
    );
  },
);
Card.displayName = 'Card';

export default Card;
