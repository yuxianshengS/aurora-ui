import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Tag,
  Card,
  Switch,
  Alert,
  Progress,
  KpiCard,
  message,
  Statistic,
  Input,
  Space,
} from '../components';
import { generateTheme, applyTheme, resetTheme, exportThemeCss } from '../utils/generateTheme';

const PRESETS = [
  { name: 'Aurora', color: '#5b8def' },
  { name: 'Sunset', color: '#fb7185' },
  { name: 'Ocean', color: '#06b6d4' },
  { name: 'Forest', color: '#10b981' },
  { name: 'Cosmic', color: '#a855f7' },
  { name: 'Honey', color: '#f59e0b' },
];

const ThemeStudio: React.FC = () => {
  const [brand, setBrand] = useState('#5b8def');
  const tokens = useMemo(() => generateTheme(brand), [brand]);

  // 实时套用到 :root
  useEffect(() => {
    applyTheme(tokens);
    return () => {
      // 离开页面恢复默认
      resetTheme();
    };
  }, [tokens]);

  const css = exportThemeCss(tokens);

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(css);
      message.success('CSS 已复制到剪贴板');
    } catch {
      message.info(css);
    }
  };

  return (
    <>
      <h1>Theme Studio · 主题调色台</h1>
      <p>
        给一个品牌色, 自动生成完整 token 集 (主色 / hover / active / soft + 12 档色阶
        + 语义色) 实时预览所有组件, 一键复制 CSS。也可作为 npm 包 <code>generateTheme()</code>
        在你的项目里运行时切主题。
      </p>

      <Card style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>1. 选择品牌色</h3>
        <Space style={{ marginBottom: 12, flexWrap: 'wrap' }}>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setBrand(p.color)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: brand === p.color ? p.color : 'var(--au-bg-mute)',
                color: brand === p.color ? '#fff' : 'var(--au-text-1)',
                border: `1px solid ${brand === p.color ? p.color : 'var(--au-border)'}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: p.color,
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
              />
              {p.name}
            </button>
          ))}
        </Space>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="color"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ width: 56, height: 40, border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="#7c3aed"
            style={{ width: 160, fontFamily: 'var(--au-mono)' }}
          />
          <Tag color="primary">{brand}</Tag>
        </div>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>2. 12 档色阶</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
          {tokens.scale.map((c, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  height: 56,
                  background: c,
                  borderRadius: 6,
                  border: '1px solid var(--au-border)',
                }}
              />
              <div style={{ fontSize: 10, color: 'var(--au-text-3)', marginTop: 4, fontFamily: 'var(--au-mono)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>3. 实时预览</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button type="primary">主按钮</Button>
            <Button>默认按钮</Button>
            <Button type="dashed">虚线按钮</Button>
            <Button type="ghost">幽灵按钮</Button>
            <Switch defaultChecked />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tag color="primary">主色 Tag</Tag>
            <Tag color="success">success</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="danger">danger</Tag>
            <Tag color="info">info</Tag>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Progress percent={62} />
            <Progress percent={88} status="success" />
            <Statistic title="销售额" value={128500} prefix="¥" />
          </div>
          <KpiCard
            title="本月转化率"
            value={24.6}
            suffix="%"
            delta={{ value: 5.2, suffix: '%' }}
            status="success"
            trend={{ data: [12, 14, 13, 16, 18, 22, 21, 24], type: 'area' }}
          />
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Alert type="info" title="信息提示" description="主题色实时驱动 Alert 的左色条" />
          <Alert type="success" title="成功提示" />
          <Alert type="warning" title="警告" />
          <Alert type="error" title="错误" />
        </div>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>4. 导出 CSS</h3>
          <Button type="primary" onClick={copyCss}>复制 CSS</Button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            background: 'var(--au-pre-bg)',
            color: 'var(--au-pre-text)',
            borderRadius: 8,
            fontSize: 12.5,
            fontFamily: 'var(--au-mono)',
            overflow: 'auto',
          }}
        >
          {css}
        </pre>
        <p style={{ marginTop: 12, color: 'var(--au-text-3)', fontSize: 13 }}>
          也可在代码里直接用: <br />
          <code style={{ background: 'var(--au-bg-mute)', padding: '2px 6px', borderRadius: 4 }}>
            {`import { generateTheme, applyTheme } from 'aurora-ux';`}
          </code>
          <br />
          <code style={{ background: 'var(--au-bg-mute)', padding: '2px 6px', borderRadius: 4 }}>
            {`applyTheme(generateTheme('${brand}'))`}
          </code>
        </p>
      </Card>
    </>
  );
};

export default ThemeStudio;
