import React from 'react';
import './Input.css';
import TextArea from './TextArea';

export type InputVariant = 'outlined' | 'underline' | 'floating';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'small' | 'medium' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  /** 视觉风格:描边 / 下划线动画 / 悬浮标签 */
  variant?: InputVariant;
  /** underline / floating 变体:激活色(下划线 / 边框 / 标签色) */
  activeColor?: string;
  /** underline 变体:悬停时的背景高亮色 */
  hoverColor?: string;
  /** floating 变体:悬浮标签文字 */
  label?: React.ReactNode;
}

const InputBase: React.FC<InputProps> = ({
  size = 'medium',
  prefix,
  suffix,
  error,
  variant = 'outlined',
  activeColor,
  hoverColor,
  label,
  className = '',
  disabled,
  style,
  placeholder,
  ...rest
}) => {
  const innerPlaceholder =
    variant === 'floating' ? (placeholder ?? ' ') : placeholder;
  const wrapperClasses = [
    'au-input',
    `au-input--${variant}`,
    `au-input--${size}`,
    error ? 'is-error' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties | undefined =
    activeColor || hoverColor
      ? ({
          ...(activeColor ? { ['--au-input-active' as string]: activeColor } : {}),
          ...(hoverColor ? { ['--au-input-hover-bg' as string]: hoverColor } : {}),
          ...style,
        } as React.CSSProperties)
      : style;

  return (
    <span className={wrapperClasses} style={mergedStyle}>
      {prefix && variant !== 'floating' && (
        <span className="au-input__affix">{prefix}</span>
      )}
      <input
        className="au-input__inner"
        disabled={disabled}
        placeholder={innerPlaceholder}
        {...rest}
      />
      {variant === 'floating' && label != null && (
        <span className="au-input__floating-label">{label}</span>
      )}
      {suffix && variant !== 'floating' && (
        <span className="au-input__affix">{suffix}</span>
      )}
      {variant === 'underline' && <span className="au-input__border" aria-hidden />}
    </span>
  );
};

const Input = Object.assign(InputBase, { TextArea });

export { TextArea };
export type { TextAreaProps, AutoSizeOption } from './TextArea';
export default Input;
