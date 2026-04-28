import React, { useState } from 'react';
import './Rate.css';

export interface RateProps {
  /** 星数 */
  count?: number;
  /** 受控值 */
  value?: number;
  /** 非受控默认值 */
  defaultValue?: number;
  /** 变化回调 */
  onChange?: (value: number) => void;
  /** 鼠标悬停预览 */
  onHoverChange?: (value: number) => void;
  /** 允许半星 */
  allowHalf?: boolean;
  /** 允许清除 (再点当前分数清零) */
  allowClear?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 只读 (禁用 hover/click 但显示分数) */
  readOnly?: boolean;
  /** 自定义图标 */
  character?: React.ReactNode;
  /** 单星尺寸 (px) */
  size?: number;
  /** 颜色 — 'aurora' 走渐变 */
  color?: 'aurora' | string;
  /** 满分时(value === count)颜色 */
  fullColor?: string;
  /** 提示文字 (按 index 一对一, 比如 ['terrible','bad','ok','good','excellent']) */
  tooltips?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const StarIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

/**
 * 评分组件 — 半星 / 全星, hover 预览, 可清除。
 * Aurora 招牌:color="aurora" 满分时星星走渐变色, 比单纯黄星酷。
 */
const Rate: React.FC<RateProps> = ({
  count = 5,
  value: ctrlValue,
  defaultValue = 0,
  onChange,
  onHoverChange,
  allowHalf,
  allowClear,
  disabled,
  readOnly,
  character,
  size = 24,
  color = '#fbbf24',
  fullColor,
  tooltips,
  className = '',
  style,
}) => {
  const isCtrl = ctrlValue !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const value = isCtrl ? ctrlValue! : innerValue;
  const display = hoverValue ?? value;
  const isFull = display === count;
  const interactive = !disabled && !readOnly;

  const isAurora = color === 'aurora';
  const fillColor = isFull && fullColor ? fullColor : isAurora ? undefined : color;

  const setValue = (v: number) => {
    if (!interactive) return;
    if (allowClear && v === value) v = 0;
    if (!isCtrl) setInnerValue(v);
    onChange?.(v);
  };

  const handleStarClick = (
    starIndex: number,
    e: React.MouseEvent<HTMLLIElement>,
  ) => {
    if (!interactive) return;
    if (allowHalf) {
      const r = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - r.left < r.width / 2;
      setValue(starIndex + (isLeftHalf ? 0.5 : 1));
    } else {
      setValue(starIndex + 1);
    }
  };

  const handleStarMove = (
    starIndex: number,
    e: React.MouseEvent<HTMLLIElement>,
  ) => {
    if (!interactive) return;
    let next: number;
    if (allowHalf) {
      const r = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - r.left < r.width / 2;
      next = starIndex + (isLeftHalf ? 0.5 : 1);
    } else {
      next = starIndex + 1;
    }
    if (next !== hoverValue) {
      setHoverValue(next);
      onHoverChange?.(next);
    }
  };

  const handleListLeave = () => {
    setHoverValue(null);
    onHoverChange?.(value);
  };

  const cls = [
    'au-rate',
    isAurora ? 'au-rate--aurora' : '',
    disabled ? 'is-disabled' : '',
    readOnly ? 'is-readonly' : '',
    isFull ? 'is-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={cls} style={style} onMouseLeave={handleListLeave} role="radiogroup">
      {Array.from({ length: count }, (_, i) => {
        const fillRatio = Math.max(0, Math.min(1, display - i));
        const tip = tooltips?.[Math.ceil(display) - 1];
        return (
          <li
            key={i}
            className={[
              'au-rate__star',
              fillRatio === 0 ? 'is-empty' : fillRatio === 1 ? 'is-full' : 'is-half',
              !interactive ? 'is-locked' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              width: size,
              height: size,
              ['--au-rate-color' as string]: fillColor,
            }}
            onClick={(e) => handleStarClick(i, e)}
            onMouseMove={(e) => handleStarMove(i, e)}
            role="radio"
            aria-checked={display > i}
            aria-label={tip ?? `${i + 1} 星`}
            title={tip}
          >
            {/* 底层空星 */}
            <span className="au-rate__bg">{character ?? <StarIcon size={size} />}</span>
            {/* 上层填充 (用 width 控制半星) */}
            <span
              className="au-rate__fg"
              style={{ width: `${fillRatio * 100}%` }}
            >
              {character ?? <StarIcon size={size} />}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Rate;
