import React, { useState } from 'react';
import './DemoBlock.css';

export interface DemoBlockProps {
  title?: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

const DemoBlock: React.FC<DemoBlockProps> = ({
  title,
  description,
  code,
  children,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="demo-block">
      {(title || description) && (
        <div className="demo-block__head">
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className="demo-block__preview">{children}</div>
      <div className="demo-block__toolbar">
        <button onClick={() => setShowCode((v) => !v)}>
          {showCode ? '隐藏代码' : '显示代码'}
        </button>
        <button onClick={copy}>{copied ? '已复制' : '复制代码'}</button>
      </div>
      {showCode && (
        <pre className="demo-block__code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default DemoBlock;
