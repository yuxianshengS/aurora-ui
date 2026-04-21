import React, { useMemo, useState } from 'react';
import './Playground.css';

export type PlaygroundControl =
  | {
      name: string;
      label?: string;
      type: 'boolean';
      default?: boolean;
    }
  | {
      name: string;
      label?: string;
      type: 'select';
      options: string[];
      default?: string;
    }
  | {
      name: string;
      label?: string;
      type: 'text';
      default?: string;
    };

export interface PlaygroundProps {
  title?: string;
  description?: string;
  componentName: string;
  component: React.ComponentType<any>;
  controls: PlaygroundControl[];
  /** Extra non-configurable props passed straight through (e.g. onChange). */
  extraProps?: Record<string, unknown>;
  /** Whether to self-close the generated JSX tag. Defaults to true. */
  selfClosing?: boolean;
}

function initialState(controls: PlaygroundControl[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const c of controls) {
    if (c.type === 'boolean') obj[c.name] = c.default ?? false;
    else if (c.type === 'select') obj[c.name] = c.default ?? c.options[0];
    else obj[c.name] = c.default ?? '';
  }
  return obj;
}

function generateCode(
  componentName: string,
  controls: PlaygroundControl[],
  values: Record<string, unknown>,
  selfClosing: boolean,
) {
  const lines: string[] = [];
  let childrenText = '';
  for (const c of controls) {
    const v = values[c.name];
    if (c.name === 'children') {
      if (typeof v === 'string') childrenText = v;
      continue;
    }
    if (c.type === 'boolean') {
      if (v === true) lines.push(`  ${c.name}`);
    } else if (c.type === 'select') {
      if (v !== undefined && v !== '' && v !== c.default) {
        lines.push(`  ${c.name}="${String(v)}"`);
      }
    } else {
      if (typeof v === 'string' && v !== '') {
        lines.push(`  ${c.name}="${v}"`);
      }
    }
  }
  const attrs = lines.length ? `\n${lines.join('\n')}\n` : ' ';
  if (childrenText) {
    const attrStr = lines.length ? `\n${lines.join('\n')}\n` : '';
    return `<${componentName}${attrStr}>${childrenText}</${componentName}>`;
  }
  if (!lines.length) {
    return selfClosing ? `<${componentName} />` : `<${componentName}></${componentName}>`;
  }
  return `<${componentName}${attrs}${selfClosing ? '/>' : `></${componentName}>`}`;
}

const Playground: React.FC<PlaygroundProps> = ({
  title,
  description,
  componentName,
  component: Component,
  controls,
  extraProps,
  selfClosing = true,
}) => {
  const [values, setValues] = useState<Record<string, unknown>>(() => initialState(controls));
  const [copied, setCopied] = useState(false);

  const setValue = (name: string, v: unknown) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const code = useMemo(
    () => generateCode(componentName, controls, values, selfClosing),
    [componentName, controls, values, selfClosing],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  const componentProps = { ...values, ...extraProps };
  const remountKey = useMemo(() => JSON.stringify(values), [values]);

  return (
    <div className="playground">
      {(title || description) && (
        <div className="playground__head">
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className="playground__body">
        <div className="playground__preview">
          <Component key={remountKey} {...componentProps} />
        </div>
        <div className="playground__controls">
          <div className="playground__controls-title">属性配置</div>
          {controls.map((c) => {
            const v = values[c.name];
            const label = c.label ?? c.name;
            if (c.type === 'boolean') {
              return (
                <label className="playground__row" key={c.name}>
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={v as boolean}
                    onChange={(e) => setValue(c.name, e.target.checked)}
                  />
                </label>
              );
            }
            if (c.type === 'select') {
              return (
                <label className="playground__row" key={c.name}>
                  <span>{label}</span>
                  <select
                    value={v as string}
                    onChange={(e) => setValue(c.name, e.target.value)}
                  >
                    {c.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            return (
              <label className="playground__row" key={c.name}>
                <span>{label}</span>
                <input
                  type="text"
                  value={v as string}
                  onChange={(e) => setValue(c.name, e.target.value)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div className="playground__toolbar">
        <span className="playground__tag">实时代码</span>
        <button onClick={copy}>{copied ? '已复制' : '复制代码'}</button>
      </div>
      <pre className="playground__code">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default Playground;
