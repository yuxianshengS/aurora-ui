import React, { useRef, useState } from 'react';
import { Confetti, Button, Tag, Space, Card } from '../components';
import type { ConfettiHandle } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const ConfettiDoc: React.FC = () => {
  return (
    <>
      <h1>Confetti 庆祝粒子</h1>
      <p>
        Canvas 粒子物理(重力 + 旋转 + 衰减 + 形状池),0 依赖。
        命令式 <code>ref.fire()</code> 触发,或声明式 <code>trigger</code> prop 监听值变化触发。
        放进 success Result / 表单提交完 / KPI 达成 / Tour 完成等情绪节点。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="命令式触发 (推荐)"
        description={`用 ref.current.fire() 在事件回调里触发, 比声明式 trigger 更灵活。点 "成功" 看效果。`}
        code={`const ref = useRef<ConfettiHandle>(null);

<Button onClick={() => ref.current?.fire({ count: 200 })}>
  成功 🎉
</Button>
<Confetti ref={ref} />`}
      >
        <CmdDemo />
      </DemoBlock>

      <DemoBlock
        title="声明式 trigger"
        description={`trigger 任意值变化都会重新 fire, 适合"提交完表单自动放鞭炮"。`}
        code={`const [done, setDone] = useState(0);

<Button onClick={() => setDone((n) => n + 1)}>庆祝 (已 {done} 次)</Button>
<Confetti trigger={done} count={150} origin="bottom" />`}
      >
        <DeclarativeDemo />
      </DemoBlock>

      <DemoBlock
        title="不同形状 + 自定义起爆点"
        description="shapes 控制形状(circle/rect/star), origin 起爆点。"
        code={`<Confetti
  ref={ref}
  shapes={['star']}
  count={80}
  spread={140}
  velocity={50}
  origin={{ x: 200, y: 100 }}
/>`}
      >
        <VariantDemo />
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          { prop: 'trigger', desc: '声明式触发 (任意值变化即 fire)', type: 'unknown', default: '-' },
          { prop: 'count', desc: '粒子数', type: 'number', default: '120' },
          { prop: 'colors', desc: '色板', type: 'string[]', default: '6 色极光' },
          { prop: 'shapes', desc: '形状池', type: `Array<'circle'|'rect'|'star'>`, default: `['rect','circle','star']` },
          { prop: 'spread', desc: '散开角度 (度)', type: 'number', default: '70' },
          { prop: 'velocity', desc: '初速度', type: 'number', default: '30' },
          { prop: 'gravity', desc: '重力', type: 'number', default: '0.6' },
          { prop: 'decay', desc: '速度衰减 0-1', type: 'number', default: '0.94' },
          { prop: 'duration', desc: '兜底持续 ms', type: 'number', default: '2400' },
          { prop: 'origin', desc: '起爆点', type: `'center'|'top'|'bottom'|'left'|'right'|{x,y}`, default: `'center'` },
          { prop: 'ref.fire(opts?)', desc: '命令式触发, 单次发射', type: '(opts?) => void', default: '-' },
          { prop: 'zIndex', desc: 'zIndex', type: 'number', default: '9998' },
        ]}
      />
    </>
  );
};

const CmdDemo: React.FC = () => {
  const ref = useRef<ConfettiHandle>(null);
  return (
    <>
      <Space>
        <Button type="primary" onClick={() => ref.current?.fire({ count: 200 })}>
          成功 🎉
        </Button>
        <Button onClick={() => ref.current?.fire({ count: 60, origin: 'top', spread: 180 })}>
          顶部撒花
        </Button>
      </Space>
      <Confetti ref={ref} />
    </>
  );
};

const DeclarativeDemo: React.FC = () => {
  const [done, setDone] = useState(0);
  return (
    <>
      <Space>
        <Button onClick={() => setDone((n) => n + 1)}>庆祝</Button>
        <Tag color="success">已触发 {done} 次</Tag>
      </Space>
      {done > 0 && <Confetti trigger={done} count={150} origin="bottom" />}
    </>
  );
};

const VariantDemo: React.FC = () => {
  const ref = useRef<ConfettiHandle>(null);
  return (
    <>
      <Card hoverable style={{ width: 360, padding: 20 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button onClick={() => ref.current?.fire({ shapes: ['star'], count: 80, spread: 140 })}>
            星星
          </Button>
          <Button onClick={() => ref.current?.fire({ shapes: ['circle'], count: 100, gravity: 0.3 })}>
            轻飘的圆
          </Button>
          <Button onClick={() => ref.current?.fire({ velocity: 60, count: 200, spread: 180 })}>
            大爆炸
          </Button>
        </Space>
      </Card>
      <Confetti ref={ref} />
    </>
  );
};

export default ConfettiDoc;
