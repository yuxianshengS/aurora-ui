import React, { useState } from 'react';
import { AuroraCursor, Button, Tag, Space } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const AuroraCursorDoc: React.FC = () => {
  return (
    <>
      <h1>AuroraCursor 鼠标极光尾巴</h1>
      <p>
        Aurora 招牌特效:鼠标轨迹拖一道极光拖尾。Canvas 实现, 0 依赖, GPU 友好。
        触屏设备 / <code>prefers-reduced-motion</code> 自动不挂载。
        整站打开就是 Aurora 的标志,通常放在 App 根节点。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="开 / 关"
        description="点开关后, 移动鼠标在本页面任意位置, 会留下一道极光拖尾。"
        code={`{open && <AuroraCursor />}`}
      >
        <ToggleDemo />
      </DemoBlock>

      <DemoBlock
        title="自定义颜色 + 长度"
        description="colors 改色板, length 改尾巴长度, thickness 改起始粗细。"
        code={`<AuroraCursor
  colors={['#10b981', '#06b6d4']}
  length={32}
  thickness={20}
/>`}
      >
        <CustomDemo />
      </DemoBlock>

      <DemoBlock
        title="放进 App 根节点(推荐)"
        description="在你的 App.tsx / main.tsx 顶层挂一次, 全站永久生效。"
        code={`// main.tsx
import { AuroraCursor } from 'aurora-ux';

<App />
<AuroraCursor />`}
      >
        <Tag color="primary">见左侧 ↑ 代码</Tag>
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          { prop: 'colors', desc: '渐变色板', type: 'string[]', default: `['#22d3ee','#a855f7','#ec4899']` },
          { prop: 'length', desc: '尾巴长度 (历史点数)', type: 'number', default: '22' },
          { prop: 'thickness', desc: '起始线宽 (px)', type: 'number', default: '14' },
          { prop: 'fade', desc: '帧间衰减 0-1', type: 'number', default: '0.86' },
          { prop: 'opacity', desc: '整体不透明度', type: 'number', default: '0.85' },
          { prop: 'blendMode', desc: 'mix-blend-mode', type: 'CSS mix-blend-mode', default: `'screen'` },
          { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
          { prop: 'zIndex', desc: 'zIndex', type: 'number', default: '9999' },
        ]}
      />
    </>
  );
};

const ToggleDemo: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOn((v) => !v)}>
        {on ? '关闭极光鼠标' : '打开极光鼠标'}
      </Button>
      {on && <AuroraCursor />}
    </>
  );
};

const CustomDemo: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <Space>
      <Button onClick={() => setOn((v) => !v)}>
        {on ? '关' : '开'} 绿青配色 + 长尾
      </Button>
      {on && <AuroraCursor colors={['#10b981', '#06b6d4']} length={32} thickness={20} />}
    </Space>
  );
};

export default AuroraCursorDoc;
