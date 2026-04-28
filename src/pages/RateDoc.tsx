import React, { useState } from 'react';
import { Rate, Space, Tag } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const RateDoc: React.FC = () => {
  return (
    <>
      <h1>Rate 评分</h1>
      <p>
        星级评分 — 支持半星 / hover 预览 / 清除 / 受控。
        Aurora 招牌:<code>color="aurora"</code> 满分时星星变紫粉发光,比单纯黄星高级。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法"
        description="defaultValue 给非受控初始值, 点击改分。"
        code={`<Rate defaultValue={3} />`}
      >
        <Rate defaultValue={3} />
      </DemoBlock>

      <DemoBlock
        title="半星 + 受控"
        description="allowHalf 允许半星; 受控配 onChange。"
        code={`const [v, setV] = useState(3.5);

<Rate value={v} onChange={setV} allowHalf />`}
      >
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock
        title="aurora 满分发光 (招牌)"
        description={`color="aurora": 默认黄星, 满分时星星变紫粉色 + drop-shadow 发光。`}
        code={`<Rate defaultValue={5} color="aurora" />`}
      >
        <Space size="large" align="center">
          <Rate defaultValue={3} color="aurora" allowHalf />
          <Rate defaultValue={5} color="aurora" />
          <span style={{ color: 'var(--au-text-3)', fontSize: 13 }}>
            ↑ 拉满 5 星看变化
          </span>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="提示文字"
        description="tooltips 按 index 一对一, hover 时显示。"
        code={`<Rate
  defaultValue={3}
  allowHalf
  tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
/>`}
      >
        <Rate
          defaultValue={3}
          allowHalf
          tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
        />
      </DemoBlock>

      <DemoBlock
        title="只读 / 禁用"
        code={`<Rate value={4.5} allowHalf readOnly />
<Rate value={3} disabled />`}
      >
        <Space direction="vertical">
          <Space>
            <Rate value={4.5} allowHalf readOnly />
            <Tag>readOnly</Tag>
          </Space>
          <Space>
            <Rate value={3} disabled />
            <Tag>disabled</Tag>
          </Space>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="允许清除 + 自定义图标"
        description="allowClear: 再点当前分数清零。character 替换默认星星。"
        code={`<Rate
  defaultValue={3}
  allowClear
  character={<span style={{ fontSize: 24 }}>♥</span>}
  color="#ec4899"
/>`}
      >
        <Rate
          defaultValue={3}
          allowClear
          character={<span style={{ fontSize: 24 }}>♥</span>}
          color="#ec4899"
        />
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          { prop: 'count', desc: '星数', type: 'number', default: '5' },
          { prop: 'value / defaultValue', desc: '受控值 / 非受控初始', type: 'number', default: '0' },
          { prop: 'onChange', desc: '变化回调', type: '(value) => void', default: '-' },
          { prop: 'onHoverChange', desc: 'hover 预览变化', type: '(value) => void', default: '-' },
          { prop: 'allowHalf', desc: '允许半星', type: 'boolean', default: 'false' },
          { prop: 'allowClear', desc: '再点当前分数清零', type: 'boolean', default: 'false' },
          { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
          { prop: 'readOnly', desc: '只读 (显示分数但不可改)', type: 'boolean', default: 'false' },
          { prop: 'character', desc: '自定义图标 (默认 SVG 五角星)', type: 'ReactNode', default: '-' },
          { prop: 'size', desc: '单星尺寸 (px)', type: 'number', default: '24' },
          { prop: 'color', desc: `颜色, 'aurora' 走渐变`, type: `'aurora' | string`, default: `'#fbbf24'` },
          { prop: 'fullColor', desc: '满分时颜色 (覆盖 color)', type: 'string', default: '-' },
          { prop: 'tooltips', desc: '提示文字数组', type: 'string[]', default: '-' },
        ]}
      />
    </>
  );
};

const ControlledDemo: React.FC = () => {
  const [v, setV] = useState(3.5);
  return (
    <Space size="large" align="center">
      <Rate value={v} onChange={setV} allowHalf />
      <Tag color="primary">{v} 分</Tag>
    </Space>
  );
};

export default RateDoc;
