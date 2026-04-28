import React from 'react';
import './Kbd.css';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 视觉风格 — 'default' 灰键帽 / 'glass' 玻璃 / 'aurora' 极光描边 */
  variant?: 'default' | 'glass' | 'aurora';
  /** 简写: 直接传字符串数组, 自动用 + 号串起来.  如 keys={['⌘', 'K']} */
  keys?: React.ReactNode[];
  /** 串联符号 */
  separator?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * 键盘按键样式 — 用于文档 / 快捷键面板 / Tour 提示。
 * 比 <kbd> 原生标签好看,等宽字 + 立体内阴影模仿真实键帽。
 */
const Kbd: React.FC<KbdProps> = ({
  size = 'medium',
  variant = 'default',
  keys,
  separator = <span className="au-kbd-sep">+</span>,
  children,
  className = '',
  ...rest
}) => {
  // 多键串联模式
  if (keys && keys.length > 0) {
    return (
      <span
        className={['au-kbd-group', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {keys.map((k, i) => (
          <React.Fragment key={i}>
            {i > 0 && separator}
            <kbd
              className={[
                'au-kbd',
                `au-kbd--${size}`,
                `au-kbd--${variant}`,
              ].join(' ')}
            >
              {k}
            </kbd>
          </React.Fragment>
        ))}
      </span>
    );
  }
  return (
    <kbd
      className={[
        'au-kbd',
        `au-kbd--${size}`,
        `au-kbd--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </kbd>
  );
};

export default Kbd;
