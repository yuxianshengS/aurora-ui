import React from 'react';
import { Card, Button } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';
import Playground from '../site-components/Playground';

const CardDoc: React.FC = () => (
  <>
    <h1>Card 卡片</h1>
    <p>用于承载相关联的信息或操作，常见于列表、仪表盘等场景。</p>

    <h2>代码演示</h2>

    <DemoBlock
      title="基础卡片"
      code={`<Card title="卡片标题">
  卡片内容区域，可放置任意内容。
</Card>`}
    >
      <div style={{ width: 320 }}>
        <Card title="卡片标题">卡片内容区域，可放置任意内容。</Card>
      </div>
    </DemoBlock>

    <DemoBlock
      title="带操作区"
      code={`<Card title="标题" extra={<a href="#">更多</a>}>
  内容内容
</Card>`}
    >
      <div style={{ width: 320 }}>
        <Card title="最近访问" extra={<a href="#">查看全部</a>}>
          这里是一段介绍文本。
        </Card>
      </div>
    </DemoBlock>

    <DemoBlock
      title="可悬浮卡片"
      code={`<Card hoverable title="悬停有阴影">
  ...
</Card>`}
    >
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ width: 260 }}>
          <Card hoverable title="悬停有阴影">
            试试把鼠标移到卡片上。
          </Card>
        </div>
        <div style={{ width: 260 }}>
          <Card hoverable title="包含操作">
            <p style={{ margin: '0 0 12px' }}>卡片支持嵌套任意组件。</p>
            <Button type="primary" size="small">
              前往查看
            </Button>
          </Card>
        </div>
      </div>
    </DemoBlock>

    <h2>交互式调试</h2>
    <Playground
      title="实时调整 Card 属性"
      componentName="Card"
      component={Card}
      controls={[
        { name: 'title', type: 'text', default: '卡片标题' },
        { name: 'children', type: 'text', label: '内容', default: '卡片内容区域,可放置任意内容。' },
        { name: 'bordered', type: 'boolean', default: true },
        { name: 'hoverable', type: 'boolean', default: false },
      ]}
    />

    <h2>API</h2>
    <ApiTable
      rows={[
        { prop: 'title', desc: '卡片标题', type: 'ReactNode', default: '-' },
        { prop: 'extra', desc: '右上角操作区', type: 'ReactNode', default: '-' },
        {
          prop: 'bordered',
          desc: '是否显示边框',
          type: 'boolean',
          default: 'true',
        },
        {
          prop: 'hoverable',
          desc: '是否开启悬浮效果',
          type: 'boolean',
          default: 'false',
        },
      ]}
    />
  </>
);

export default CardDoc;
