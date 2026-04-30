import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './TextArea.css';

export interface AutoSizeOption {
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  /** 自动调整高度;传对象可限制最小/最大行数 */
  autoSize?: boolean | AutoSizeOption;
  /** 字符计数器;传 `{ formatter }` 可自定义展示 */
  showCount?:
    | boolean
    | {
        formatter?: (info: { count: number; maxLength?: number }) => React.ReactNode;
      };
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  props,
  forwardedRef,
) {
  const {
    size = 'medium',
    error,
    autoSize,
    showCount,
    className = '',
    disabled,
    style,
    value,
    defaultValue,
    onChange,
    maxLength,
    rows = 3,
    ...rest
  } = props;

  const innerRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(
    forwardedRef,
    () => innerRef.current as HTMLTextAreaElement,
    [],
  );

  const [innerValue, setInnerValue] = useState<string>(() =>
    value !== undefined ? String(value) : String(defaultValue ?? ''),
  );
  const controlledValue =
    value !== undefined ? String(value) : innerValue;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (value === undefined) setInnerValue(e.target.value);
    onChange?.(e);
  };

  // autoSize: measure scrollHeight, clamp to min/max rows.
  useLayoutEffect(() => {
    if (!autoSize) return;
    const ta = innerRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const cs = window.getComputedStyle(ta);
    const lineH =
      parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5 || 20;
    const padT = parseFloat(cs.paddingTop) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;
    const borderT = parseFloat(cs.borderTopWidth) || 0;
    const borderB = parseFloat(cs.borderBottomWidth) || 0;
    const extra = padT + padB + borderT + borderB;

    let h = ta.scrollHeight;
    const opts: AutoSizeOption = typeof autoSize === 'object' ? autoSize : {};
    if (opts.minRows) {
      h = Math.max(h, opts.minRows * lineH + extra);
    }
    if (opts.maxRows) {
      const maxH = opts.maxRows * lineH + extra;
      if (h > maxH) {
        h = maxH;
        ta.style.overflowY = 'auto';
      } else {
        ta.style.overflowY = 'hidden';
      }
    } else {
      ta.style.overflowY = 'hidden';
    }
    ta.style.height = `${h}px`;
  }, [controlledValue, autoSize]);

  const renderCount = () => {
    if (!showCount) return null;
    const count = controlledValue.length;
    const info = { count, maxLength };
    let content: React.ReactNode;
    if (typeof showCount === 'object' && showCount.formatter) {
      content = showCount.formatter(info);
    } else if (maxLength !== undefined) {
      content = `${count}/${maxLength}`;
    } else {
      content = String(count);
    }
    return <span className="au-textarea__count">{content}</span>;
  };

  const wrapperClasses = [
    'au-textarea',
    `au-textarea--${size}`,
    error ? 'is-error' : '',
    disabled ? 'is-disabled' : '',
    showCount ? 'au-textarea--with-count' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={wrapperClasses} style={style}>
      <textarea
        ref={innerRef}
        className="au-textarea__inner"
        disabled={disabled}
        rows={rows}
        value={controlledValue}
        onChange={handleChange}
        maxLength={maxLength}
        {...rest}
      />
      {renderCount()}
    </span>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
