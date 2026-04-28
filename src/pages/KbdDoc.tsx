import React from 'react';
import { Kbd, Space, Card } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const KbdDoc: React.FC = () => {
  return (
    <>
      <h1>Kbd 键帽</h1>
      <p>
        键盘按键样式 — 用于文档 / 快捷键面板 / Tour 提示。等宽字 + 立体内阴影模仿真实键帽,
        比原生 <code>&lt;kbd&gt;</code> 标签好看。Aurora 强调 ⌘K 流派,这个组件配套必备。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法 — 3 种风格"
        code={`<Kbd>⌘</Kbd>
<Kbd variant="glass">K</Kbd>
<Kbd variant="aurora">Enter</Kbd>`}
      >
        <Space size="large" align="center">
          <Space>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </Space>
          <Space>
            <Kbd variant="glass">⌘</Kbd>
            <Kbd variant="glass">K</Kbd>
          </Space>
          <Space>
            <Kbd variant="aurora">⌘</Kbd>
            <Kbd variant="aurora">K</Kbd>
          </Space>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="多键串联 (keys 简写)"
        description="传 keys 数组, 自动用 + 串起来。"
        code={`<Kbd keys={['⌘', 'Shift', 'P']} />
<Kbd keys={['Ctrl', 'C']} variant="glass" />
<Kbd keys={['⌘', 'K']} variant="aurora" size="large" />`}
      >
        <Space size="large" direction="vertical">
          <Kbd keys={['⌘', 'Shift', 'P']} />
          <Kbd keys={['Ctrl', 'C']} variant="glass" />
          <Kbd keys={['⌘', 'K']} variant="aurora" size="large" />
        </Space>
      </DemoBlock>

      <DemoBlock
        title="3 种尺寸"
        code={`<Kbd size="small">S</Kbd>
<Kbd size="medium">M</Kbd>
<Kbd size="large">L</Kbd>`}
      >
        <Space size="large" align="center">
          <Kbd size="small">S</Kbd>
          <Kbd size="medium">M</Kbd>
          <Kbd size="large">L</Kbd>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="放进句子"
        description="inline 排版友好, 跟正文文字共行无违和。"
        code={`<p>按 <Kbd>⌘</Kbd>+<Kbd>K</Kbd> 唤起命令面板, ESC 关闭。</p>`}
      >
        <Card style={{ padding: 16, fontSize: 14 }}>
          按 <Kbd>⌘</Kbd>+<Kbd>K</Kbd> 唤起命令面板,
          按 <Kbd>Esc</Kbd> 关闭。在 Windows 用 <Kbd keys={['Ctrl', 'K']} />。
        </Card>
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          { prop: 'children', desc: '单键内容', type: 'ReactNode', default: '-' },
          { prop: 'keys', desc: '多键串联简写, 数组每项渲染一个 Kbd, 自动加分隔符', type: 'ReactNode[]', default: '-' },
          { prop: 'separator', desc: '多键之间的分隔符', type: 'ReactNode', default: '+' },
          { prop: 'size', desc: '尺寸', type: `'small' | 'medium' | 'large'`, default: `'medium'` },
          { prop: 'variant', desc: '视觉风格', type: `'default' | 'glass' | 'aurora'`, default: `'default'` },
        ]}
      />
    </>
  );
};

export default KbdDoc;
