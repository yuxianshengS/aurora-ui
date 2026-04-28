import React from 'react';
import { Reveal, Stagger, Tilt, Card, Tag, GlowCard } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const MotionDoc: React.FC = () => {
  return (
    <>
      <h1>Motion 微交互三件套</h1>
      <p>
        通用微交互原语:<code>Reveal</code> 滚动揭示、<code>Stagger</code> 错峰子项、
        <code>Tilt</code> 鼠标驱动 3D 倾斜。零依赖, GPU 友好(全部 transform/opacity),
        默认尊重 <code>prefers-reduced-motion</code>。
      </p>

      <h2>Reveal — 滚动揭示</h2>

      <DemoBlock
        title="基础用法"
        description="滚到视口时 fade + 滑入。direction 改方向, distance 改位移。多个 Reveal 用 delay 错峰也行。"
        code={`<Reveal>
  <Card>滚动到这里, 我会从下方滑入</Card>
</Reveal>

<Reveal direction="left" distance={40} delay={150}>
  <Card>从左侧滑入, 多 150ms 延迟</Card>
</Reveal>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Reveal>
            <Card title="up" hoverable style={{ width: 200 }}>
              从下方滑入(默认)
            </Card>
          </Reveal>
          <Reveal direction="left" distance={40} delay={150}>
            <Card title="left" hoverable style={{ width: 200 }}>
              从左滑入 (delay 150ms)
            </Card>
          </Reveal>
          <Reveal direction="right" distance={40} delay={300}>
            <Card title="right" hoverable style={{ width: 200 }}>
              从右滑入 (delay 300ms)
            </Card>
          </Reveal>
        </div>
      </DemoBlock>

      <h2>Stagger — 错峰子项</h2>

      <DemoBlock
        title="基础用法"
        description={`重要: 子元素必须直接传进 Stagger (不要再包一层 <div>!), 否则只会被当作 1 项不会错峰。容器布局写在 Stagger 自己的 style 上。`}
        code={`<Stagger
  stagger={80}
  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 12 }}
>
  <Card title="指标 A">...</Card>
  <Card title="指标 B">...</Card>
  <Card title="指标 C">...</Card>
  <Card title="指标 D">...</Card>
  <Card title="指标 E">...</Card>
  <Card title="指标 F">...</Card>
</Stagger>`}
      >
        <Stagger
          stagger={80}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 12 }}
        >
          {['指标 A', '指标 B', '指标 C', '指标 D', '指标 E', '指标 F'].map((t, i) => (
            <Card key={t} title={t} hoverable>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{(i + 1) * 1280}</div>
              <Tag color="success">+{(i + 1) * 1.2}%</Tag>
            </Card>
          ))}
        </Stagger>
      </DemoBlock>

      <DemoBlock
        title="横向 flex 错峰"
        description="把 display 改成 flex, 标签依次飞入。"
        code={`<Stagger stagger={120} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
  <Tag color="primary">primary</Tag>
  <Tag color="success">success</Tag>
  <Tag color="warning">warning</Tag>
  <Tag color="danger">danger</Tag>
  <Tag color="info">info</Tag>
  <Tag color="purple">purple</Tag>
</Stagger>`}
      >
        <Stagger stagger={120} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Tag color="primary">primary</Tag>
          <Tag color="success">success</Tag>
          <Tag color="warning">warning</Tag>
          <Tag color="danger">danger</Tag>
          <Tag color="info">info</Tag>
          <Tag color="purple">purple</Tag>
        </Stagger>
      </DemoBlock>

      <h2>Tilt — 鼠标 3D 倾斜</h2>

      <DemoBlock
        title="基础用法"
        description="鼠标在卡片上移动时按位置做 X/Y rotate, 高光 sheen 跟着鼠标。intensity 改最大角度。"
        code={`<Tilt intensity={10}>
  <GlowCard glowColor="#a855f7">
    <h3>悬停感受 3D</h3>
  </GlowCard>
</Tilt>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Tilt intensity={12}>
            <GlowCard glowColor="#a855f7" padding={28} style={{ width: 240 }}>
              <h4 style={{ margin: 0 }}>悬停感受 3D 倾斜</h4>
              <p style={{ marginTop: 8, color: 'var(--au-text-2)', fontSize: 13 }}>
                配 GlowCard 招牌组合
              </p>
            </GlowCard>
          </Tilt>
          <Tilt intensity={6} sheen={false}>
            <Card hoverable style={{ width: 240, padding: 24 }}>
              <h4 style={{ margin: 0 }}>低强度 + 无 sheen</h4>
              <p style={{ marginTop: 8, color: 'var(--au-text-3)', fontSize: 13 }}>
                intensity=6, sheen=false
              </p>
            </Card>
          </Tilt>
        </div>
      </DemoBlock>

      <h2>API</h2>

      <h3>Reveal</h3>
      <ApiTable
        rows={[
          { prop: 'direction', desc: '滑入方向', type: `'up'|'down'|'left'|'right'|'none'`, default: `'up'` },
          { prop: 'distance', desc: '位移距离 (px)', type: 'number', default: '24' },
          { prop: 'delay', desc: '延迟 (ms)', type: 'number', default: '0' },
          { prop: 'duration', desc: '时长 (ms)', type: 'number', default: '600' },
          { prop: 'threshold', desc: '触发的视口比例 0-1', type: 'number', default: '0.15' },
          { prop: 'once', desc: '一次性触发', type: 'boolean', default: 'true' },
          { prop: 'as', desc: '渲染的 tag (div/section/article/...)', type: 'keyof JSX.IntrinsicElements', default: `'div'` },
        ]}
      />

      <h3>Stagger</h3>
      <ApiTable
        rows={[
          { prop: 'stagger', desc: '子项错峰间隔 (ms)', type: 'number', default: '60' },
          { prop: 'duration', desc: '单项时长 (ms)', type: 'number', default: '500' },
          { prop: 'delay', desc: '整体起始延迟 (ms)', type: 'number', default: '0' },
          { prop: 'distance', desc: '单项位移 (px)', type: 'number', default: '18' },
          { prop: 'threshold', desc: '触发的视口比例 0-1', type: 'number', default: '0.15' },
          { prop: 'once', desc: '一次性触发', type: 'boolean', default: 'true' },
          { prop: 'as', desc: '容器 tag', type: 'keyof JSX.IntrinsicElements', default: `'div'` },
        ]}
      />

      <h3>Tilt</h3>
      <ApiTable
        rows={[
          { prop: 'intensity', desc: '最大旋转角 (度)', type: 'number', default: '8' },
          { prop: 'perspective', desc: 'CSS perspective (px)', type: 'number', default: '1000' },
          { prop: 'sheen', desc: '鼠标跟随高光 sheen', type: 'boolean', default: 'true' },
          { prop: 'as', desc: '容器 tag', type: 'keyof JSX.IntrinsicElements', default: `'div'` },
        ]}
      />
    </>
  );
};

export default MotionDoc;
