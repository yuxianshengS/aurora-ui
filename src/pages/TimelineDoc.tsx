import React from 'react';
import { Timeline } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="4 12 10 18 20 6" />
  </svg>
);

const TimelineDoc: React.FC = () => (
  <>
    <h1>Timeline 时间轴</h1>
    <p>
      将一组节点沿一条时间线排开,用颜色 / 图标表达每个节点当前的状态,常用于展示部署流水线、审批流、设备状态迁移等。
    </p>

    <h2>代码演示</h2>

    <DemoBlock
      title="基础用法"
      description="传入 items 数组,每一项代表一个节点。"
      code={`<Timeline
  items={[
    { children: '创建服务器 node-01' },
    { children: '安装基础依赖' },
    { children: '部署服务' },
    { children: '服务上线', color: 'success' },
  ]}
/>`}
    >
      <Timeline
        items={[
          { children: '创建服务器 node-01' },
          { children: '安装基础依赖' },
          { children: '部署服务' },
          { children: '服务上线', color: 'success' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="节点状态颜色"
      description="通过 color 表达状态:primary / success / warning / danger / gray / default,也可直接传任意 CSS 颜色。"
      code={`<Timeline
  items={[
    { color: 'success', children: 'Step 1 完成' },
    { color: 'primary', children: 'Step 2 进行中' },
    { color: 'warning', children: 'Step 3 等待重试' },
    { color: 'danger',  children: 'Step 4 失败' },
    { color: '#a855f7', children: 'Step 5 自定义色' },
  ]}
/>`}
    >
      <Timeline
        items={[
          { color: 'success', children: 'Step 1 完成' },
          { color: 'primary', children: 'Step 2 进行中' },
          { color: 'warning', children: 'Step 3 等待重试' },
          { color: 'danger', children: 'Step 4 失败' },
          { color: '#a855f7', children: 'Step 5 自定义色' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="带时间标签"
      description="label 会显示在内容的反侧(left 模式中显示在左侧)。"
      code={`<Timeline
  items={[
    { label: '10:02', color: 'success', children: '收到请求' },
    { label: '10:03', color: 'success', children: '参数校验通过' },
    { label: '10:05', color: 'warning', children: '下游响应较慢' },
    { label: '10:06', color: 'success', children: '返回 200' },
  ]}
/>`}
    >
      <Timeline
        items={[
          { label: '10:02', color: 'success', children: '收到请求' },
          { label: '10:03', color: 'success', children: '参数校验通过' },
          { label: '10:05', color: 'warning', children: '下游响应较慢' },
          { label: '10:06', color: 'success', children: '返回 200' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="进行中的节点"
      description="loading 让节点点点周围出现呼吸脉冲,用于表示正在运行 / 未结束。"
      code={`<Timeline
  items={[
    { color: 'success', children: '克隆代码仓库' },
    { color: 'success', children: '构建镜像' },
    { color: 'primary', loading: true, children: '推送到镜像仓库...' },
    { color: 'default', children: '部署到生产' },
  ]}
/>`}
    >
      <Timeline
        items={[
          { color: 'success', children: '克隆代码仓库' },
          { color: 'success', children: '构建镜像' },
          { color: 'primary', loading: true, children: '推送到镜像仓库...' },
          { color: 'default', children: '部署到生产' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="pending 快捷写法"
      description="通过 pending 在末尾快捷追加一个「进行中」节点。"
      code={`<Timeline
  pending="等待审批..."
  items={[
    { color: 'success', children: '提交申请' },
    { color: 'success', children: '组长已审核' },
  ]}
/>`}
    >
      <Timeline
        pending="等待审批..."
        items={[
          { color: 'success', children: '提交申请' },
          { color: 'success', children: '组长已审核' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="自定义节点图标"
      description="dot 可传入任意 ReactNode,用作替代默认圆点。"
      code={`<Timeline
  items={[
    { color: 'success', dot: <CheckIcon />, children: '已验证签名' },
    { color: 'success', dot: <CheckIcon />, children: '已备份数据' },
    { color: 'primary', loading: true, children: '切换流量中' },
  ]}
/>`}
    >
      <Timeline
        items={[
          { color: 'success', dot: <CheckIcon />, children: '已验证签名' },
          { color: 'success', dot: <CheckIcon />, children: '已备份数据' },
          { color: 'primary', loading: true, children: '切换流量中' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="右侧模式"
      description="mode='right' 把轴线放到右边,内容右对齐。"
      code={`<Timeline
  mode="right"
  items={[
    { label: '08:00', color: 'success', children: '服务启动' },
    { label: '09:30', color: 'warning', children: 'CPU 峰值' },
    { label: '10:00', color: 'success', children: '回落正常' },
  ]}
/>`}
    >
      <Timeline
        mode="right"
        items={[
          { label: '08:00', color: 'success', children: '服务启动' },
          { label: '09:30', color: 'warning', children: 'CPU 峰值' },
          { label: '10:00', color: 'success', children: '回落正常' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="交替模式"
      description="mode='alternate' 让节点左右交替,适合展示双向数据。"
      code={`<Timeline
  mode="alternate"
  items={[
    { label: '01-02', color: 'success', children: '需求评审' },
    { label: '01-05', color: 'primary', children: '开发中' },
    { label: '01-12', color: 'warning', children: '联调回归' },
    { label: '01-15', color: 'success', children: '上线' },
  ]}
/>`}
    >
      <Timeline
        mode="alternate"
        items={[
          { label: '01-02', color: 'success', children: '需求评审' },
          { label: '01-05', color: 'primary', children: '开发中' },
          { label: '01-12', color: 'warning', children: '联调回归' },
          { label: '01-15', color: 'success', children: '上线' },
        ]}
      />
    </DemoBlock>

    <DemoBlock
      title="倒序"
      description="reverse 反转显示顺序,最新的节点排在最上方。"
      code={`<Timeline
  reverse
  items={[
    { label: '10:00', color: 'success', children: '任务 A 完成' },
    { label: '10:02', color: 'success', children: '任务 B 完成' },
    { label: '10:05', color: 'primary', loading: true, children: '任务 C 进行中' },
  ]}
/>`}
    >
      <Timeline
        reverse
        items={[
          { label: '10:00', color: 'success', children: '任务 A 完成' },
          { label: '10:02', color: 'success', children: '任务 B 完成' },
          { label: '10:05', color: 'primary', loading: true, children: '任务 C 进行中' },
        ]}
      />
    </DemoBlock>

    <h2>API</h2>

    <h3>Timeline</h3>
    <ApiTable
      rows={[
        {
          prop: 'items',
          desc: '时间轴节点数据',
          type: 'TimelineItem[]',
          default: '-',
        },
        {
          prop: 'mode',
          desc: '内容与轴的对齐方式',
          type: `'left' | 'right' | 'alternate'`,
          default: `'left'`,
        },
        {
          prop: 'reverse',
          desc: '是否反转顺序',
          type: 'boolean',
          default: 'false',
        },
        {
          prop: 'pending',
          desc: '在末尾追加一个「进行中」节点;传字符串/节点作为其内容',
          type: 'boolean | ReactNode',
          default: 'false',
        },
        {
          prop: 'pendingDot',
          desc: 'pending 节点的自定义图标',
          type: 'ReactNode',
          default: '-',
        },
      ]}
    />

    <h3>TimelineItem</h3>
    <ApiTable
      rows={[
        {
          prop: 'color',
          desc: '节点颜色,表示状态',
          type: `'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'default' | string`,
          default: `'primary'`,
        },
        {
          prop: 'dot',
          desc: '自定义节点图标',
          type: 'ReactNode',
          default: '-',
        },
        {
          prop: 'label',
          desc: '反侧标签,常为时间戳',
          type: 'ReactNode',
          default: '-',
        },
        {
          prop: 'children',
          desc: '节点主内容',
          type: 'ReactNode',
          default: '-',
        },
        {
          prop: 'loading',
          desc: '是否为进行中节点(呼吸脉冲动画)',
          type: 'boolean',
          default: 'false',
        },
        {
          prop: 'key',
          desc: 'React key',
          type: 'string | number',
          default: '数组 index',
        },
      ]}
    />
  </>
);

export default TimelineDoc;
