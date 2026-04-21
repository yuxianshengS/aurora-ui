import React, { useId, useState } from 'react';
import './Button.css';

export type ButtonType =
  | 'primary'
  | 'default'
  | 'dashed'
  | 'ghost'
  | 'danger'
  | 'like';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  type?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  /** 扫光效果:循环的光泽横扫动画 */
  shine?: boolean;
  /** 自定义主色。对 primary/danger 改背景;对 default/dashed/ghost 改文字与 hover 色;对 like 改按钮底色 */
  color?: string;
  /** like 类型专用:预设主题色 */
  likeTheme?: 'dark' | 'light';
  /** like 类型专用:点亮时的强调色,覆盖默认的红色 */
  activeColor?: string;
  /** like 类型专用:受控状态 */
  liked?: boolean;
  /** like 类型专用:非受控默认值 */
  defaultLiked?: boolean;
  /** like 类型专用:受控计数 */
  count?: number;
  /** like 类型专用:非受控默认计数 */
  defaultCount?: number;
  /** like 类型专用:状态变更回调 */
  onLikeChange?: (liked: boolean, count: number) => void;
}

const HeartIcon = () => (
  <svg
    fill="currentColor"
    fillRule="nonzero"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);

const LikeButtonVariant: React.FC<ButtonProps> = ({
  liked,
  defaultLiked = false,
  count,
  defaultCount = 0,
  icon,
  children = 'Likes',
  disabled,
  className = '',
  size = 'medium',
  loading = false,
  block = false,
  shine = false,
  likeTheme = 'dark',
  activeColor,
  color,
  style,
  onLikeChange,
  onClick,
  'aria-label': ariaLabel = 'Like',
  type: _type,
  ...rest
}) => {
  void _type;
  const reactId = useId();
  const isLikedControlled = liked !== undefined;
  const isCountControlled = count !== undefined;
  const [innerLiked, setInnerLiked] = useState(defaultLiked);
  const [innerCount, setInnerCount] = useState(defaultCount);

  const currentLiked = isLikedControlled ? liked! : innerLiked;
  const currentCount = isCountControlled ? count! : innerCount;
  const unlikedCount = currentLiked ? currentCount - 1 : currentCount;
  const likedCount = unlikedCount + 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    const next = e.target.checked;
    const nextCount = next ? currentCount + 1 : currentCount - 1;
    if (!isLikedControlled) setInnerLiked(next);
    if (!isCountControlled) setInnerCount(nextCount);
    onLikeChange?.(next, nextCount);
  };

  const cls = [
    'au-btn',
    'au-btn--like',
    `au-btn--like-${likeTheme}`,
    `au-btn--${size}`,
    currentLiked ? 'is-liked' : '',
    disabled ? 'is-disabled' : '',
    loading ? 'is-loading' : '',
    block ? 'au-btn--block' : '',
    shine ? 'au-btn--shine' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const customVars: React.CSSProperties = {};
  if (activeColor) (customVars as Record<string, string>)['--like-active-color'] = activeColor;
  if (color) (customVars as Record<string, string>)['--au-btn-color'] = color;
  const mergedStyle = (activeColor || color)
    ? ({ ...customVars, ...style } as React.CSSProperties)
    : style;

  return (
    <div
      className={cls}
      style={mergedStyle}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      <input
        id={reactId}
        className="au-btn__like-input"
        type="checkbox"
        checked={currentLiked}
        disabled={disabled || loading}
        onChange={handleChange}
        aria-label={ariaLabel}
      />
      <label className="au-btn__like-label" htmlFor={reactId}>
        <span className="au-btn__heart">
          {loading ? (
            <span className="au-btn__spinner" aria-hidden />
          ) : (
            icon ?? <HeartIcon />
          )}
        </span>
        {children != null && <span className="au-btn__like-text">{children}</span>}
      </label>
      <span className="au-btn__like-count au-btn__like-count--one">{unlikedCount}</span>
      <span className="au-btn__like-count au-btn__like-count--two">{likedCount}</span>
    </div>
  );
};

const Button: React.FC<ButtonProps> = (props) => {
  if (props.type === 'like') {
    return <LikeButtonVariant {...props} />;
  }

  const {
    type = 'default',
    size = 'medium',
    loading = false,
    block = false,
    shine = false,
    icon,
    disabled,
    children,
    className = '',
    color,
    style,
    // strip like-only props so they don't land on the DOM button
    liked,
    defaultLiked,
    count,
    defaultCount,
    onLikeChange,
    likeTheme,
    activeColor,
    ...rest
  } = props;
  void liked;
  void defaultLiked;
  void count;
  void defaultCount;
  void onLikeChange;
  void likeTheme;
  void activeColor;

  const classes = [
    'au-btn',
    `au-btn--${type}`,
    `au-btn--${size}`,
    block ? 'au-btn--block' : '',
    loading ? 'is-loading' : '',
    shine ? 'au-btn--shine' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle = color
    ? ({ ['--au-btn-color' as string]: color, ...style } as React.CSSProperties)
    : style;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      style={mergedStyle}
      {...rest}
    >
      {loading && <span className="au-btn__spinner" aria-hidden />}
      {!loading && icon && <span className="au-btn__icon">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
