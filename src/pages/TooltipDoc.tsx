import React from 'react';
import { Tooltip, Button } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';
import Playground from '../site-components/Playground';

const DemoPlayground: React.FC<{
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  background?: string;
  color?: string;
  arrow?: boolean;
  shake?: boolean;
}> = ({ title, placement, background, color, arrow, shake }) => (
  <div style={{ padding: '60px 0' }}>
    <Tooltip
      title={title || 'Hello 👋'}
      placement={placement}
      background={background}
      color={color}
      arrow={arrow}
      shake={shake}
    >
      <Button type="primary">Hover me</Button>
    </Tooltip>
  </div>
);

const TooltipDoc: React.FC = () => (
  <>
    <h1>Tooltip 文字提示</h1>
    <p>
      鼠标悬停或元素获得焦点时,显示对目标的简短解释。适合为图标按钮、截断文字或需要补充说明的控件添加上下文。
    </p>

    <h2>代码演示</h2>

    <DemoBlock
      title="基础用法"
      description="用 Tooltip 包裹任意触发元素,title 即气泡内容。"
      code={`<Tooltip title="Uiverse.io">
  <Button>Hover me</Button>
</Tooltip>`}
    >
      <div style={{ padding: '40px 0' }}>
        <Tooltip title="Uiverse.io">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </DemoBlock>

    <DemoBlock
      title="四个方向"
      description="通过 placement 控制气泡位置。"
      code={`<Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
<Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
<Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>`}
    >
      <div style={{ display: 'flex', gap: 16, padding: '50px 0' }}>
        <Tooltip title="Top" placement="top"><Button>Top</Button></Tooltip>
        <Tooltip title="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
        <Tooltip title="Left" placement="left"><Button>Left</Button></Tooltip>
        <Tooltip title="Right" placement="right"><Button>Right</Button></Tooltip>
      </div>
    </DemoBlock>

    <DemoBlock
      title="自定义颜色"
      description="通过 background / color 自定义气泡主题色。"
      code={`<Tooltip title="Info" background="#5b8def" color="#fff"><Button>Blue</Button></Tooltip>
<Tooltip title="Warning" background="#f5a623" color="#1f1f1f"><Button>Amber</Button></Tooltip>
<Tooltip title="Success" background="#38d39f" color="#1f1f1f"><Button>Mint</Button></Tooltip>`}
    >
      <div style={{ display: 'flex', gap: 16, padding: '40px 0' }}>
        <Tooltip title="Info" background="#5b8def" color="#fff">
          <Button>Blue</Button>
        </Tooltip>
        <Tooltip title="Warning" background="#f5a623" color="#1f1f1f">
          <Button>Amber</Button>
        </Tooltip>
        <Tooltip title="Success" background="#38d39f" color="#1f1f1f">
          <Button>Mint</Button>
        </Tooltip>
      </div>
    </DemoBlock>

    <DemoBlock
      title="抖动入场"
      description="shake 开启后,气泡出现时会抖动一下以吸引注意,适合强提示场景。"
      code={`<Tooltip title="Look at me!" shake>
  <Button type="primary">Shake</Button>
</Tooltip>`}
    >
      <div style={{ padding: '40px 0' }}>
        <Tooltip title="Look at me!" shake>
          <Button type="primary">Shake</Button>
        </Tooltip>
      </div>
    </DemoBlock>

    <DemoBlock
      title="无箭头"
      description="arrow={false} 可隐藏指向箭头。"
      code={`<Tooltip title="No arrow" arrow={false}>
  <Button>Plain</Button>
</Tooltip>`}
    >
      <div style={{ padding: '40px 0' }}>
        <Tooltip title="No arrow" arrow={false}>
          <Button>Plain</Button>
        </Tooltip>
      </div>
    </DemoBlock>

    <h2>交互式调试</h2>
    <Playground
      title="实时调整 Tooltip 属性"
      description="调整右侧控件后,把鼠标移到预览区的按钮上查看效果。"
      componentName="Tooltip"
      component={DemoPlayground}
      controls={[
        { name: 'title', type: 'text', label: 'title', default: 'Hello 👋' },
        { name: 'placement', type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'top' },
        { name: 'background', type: 'text', label: 'background', default: '#333333' },
        { name: 'color', type: 'text', label: 'color', default: '#e8e8e8' },
        { name: 'arrow', type: 'boolean', default: true },
        { name: 'shake', type: 'boolean', default: false },
      ]}
    />

    <h2>API</h2>
    <ApiTable
      rows={[
        { prop: 'title', desc: '气泡内容', type: 'ReactNode', default: '-' },
        { prop: 'children', desc: '触发元素', type: 'ReactNode', default: '-' },
        {
          prop: 'placement',
          desc: '气泡方位',
          type: `'top' | 'bottom' | 'left' | 'right'`,
          default: `'top'`,
        },
        { prop: 'background', desc: '气泡背景色', type: 'string', default: `'#333333'` },
        { prop: 'color', desc: '气泡文字色', type: 'string', default: `'#e8e8e8'` },
        { prop: 'arrow', desc: '是否显示箭头', type: 'boolean', default: 'true' },
        { prop: 'shake', desc: '打开时是否播放抖动动画', type: 'boolean', default: 'false' },
        { prop: 'open', desc: '受控显示', type: 'boolean', default: '-' },
        { prop: 'defaultOpen', desc: '非受控默认显示', type: 'boolean', default: 'false' },
        { prop: 'maxWidth', desc: '气泡最大宽度', type: 'number | string', default: `'240px'` },
      ]}
    />
  </>
);

export default TooltipDoc;
