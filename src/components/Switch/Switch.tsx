import React, { useState } from 'react';
import './Switch.css';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      disabled = false,
      size = 'medium',
      checkedChildren,
      unCheckedChildren,
      onChange,
    },
    ref,
  ) => {
    const isControlled = checked !== undefined;
    const [inner, setInner] = useState(defaultChecked);
    const current = isControlled ? checked! : inner;
    const hasChildren = checkedChildren != null || unCheckedChildren != null;

    const toggle = () => {
      if (disabled) return;
      const next = !current;
      if (!isControlled) setInner(next);
      onChange?.(next);
    };

    const cls = [
      'au-switch',
      `au-switch--${size}`,
      current ? 'is-checked' : '',
      disabled ? 'is-disabled' : '',
      hasChildren ? 'has-children' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={current}
        disabled={disabled}
        className={cls}
        onClick={toggle}
      >
        {hasChildren && (
          <span className="au-switch__inner">
            {current ? checkedChildren : unCheckedChildren}
          </span>
        )}
        <span className="au-switch__thumb" />
      </button>
    );
  },
);
Switch.displayName = 'Switch';

export default Switch;
