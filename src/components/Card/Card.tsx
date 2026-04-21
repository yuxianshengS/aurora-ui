import React from 'react';
import './Card.css';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  extra,
  bordered = true,
  hoverable = false,
  className = '',
  children,
}) => {
  const classes = [
    'au-card',
    bordered ? 'au-card--bordered' : '',
    hoverable ? 'au-card--hoverable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes}>
      {(title || extra) && (
        <div className="au-card__head">
          <div className="au-card__title">{title}</div>
          {extra && <div className="au-card__extra">{extra}</div>}
        </div>
      )}
      <div className="au-card__body">{children}</div>
    </div>
  );
};

export default Card;
