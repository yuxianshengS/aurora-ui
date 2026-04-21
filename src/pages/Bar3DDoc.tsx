import React, { useMemo, useState } from 'react';
import { Bar3D, Switch } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const products = ['Product A', 'Product B', 'Product C'];
const salesMatrix = [
  [120, 180, 150, 220],
  [90, 140, 175, 260],
  [60, 110, 190, 310],
];

const hours = ['0', '4', '8', '12', '16', '20'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Bar3DDoc: React.FC = () => {
  const trafficMatrix = useMemo(() => {
    return days.map((_, d) =>
      hours.map((_, h) => {
        const base = Math.sin((h / hours.length) * Math.PI) * 80 + 20;
        const weekendBoost = d >= 5 ? 30 : 0;
        return Math.round(base + weekendBoost + Math.random() * 15);
      }),
    );
  }, []);

  const [rotate, setRotate] = useState(false);

  return (
    <>
      <h1>Bar3D 3D 柱状图</h1>
      <p>
        基于 ECharts-GL 的 3D 柱状图组件,适合展示二维类目 × 数值的分布,支持自动旋转、深浅主题、颜色渐变与视角交互。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法"
        description="传入 xCategories / yCategories 以及 data 矩阵即可渲染。"
        code={`<Bar3D
  xCategories={['Q1', 'Q2', 'Q3', 'Q4']}
  yCategories={['Product A', 'Product B', 'Product C']}
  data={[
    [120, 180, 150, 220],
    [90, 140, 175, 260],
    [60, 110, 190, 310],
  ]}
/>`}
      >
        <Bar3D
          xCategories={quarters}
          yCategories={products}
          data={salesMatrix}
        />
      </DemoBlock>

      <DemoBlock
        title="自动旋转"
        description="autoRotate 会让整个场景匀速旋转,展示时很有仪式感。"
        code={`<Bar3D autoRotate autoRotateSpeed={12} ... />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <Switch checked={rotate} onChange={setRotate} />
            <span>autoRotate</span>
          </label>
          <Bar3D
            xCategories={quarters}
            yCategories={products}
            data={salesMatrix}
            autoRotate={rotate}
            autoRotateSpeed={12}
          />
        </div>
      </DemoBlock>

      <DemoBlock
        title="自定义配色"
        description="colorRange 按数值从低到高线性插值,支持 2 个或多个颜色。"
        code={`<Bar3D colorRange={['#38d39f', '#f5a623', '#fc4e4e']} ... />`}
      >
        <Bar3D
          xCategories={hours}
          yCategories={days}
          data={trafficMatrix}
          colorRange={['#38d39f', '#f5a623', '#fc4e4e']}
          title="一周访问热力(按小时)"
        />
      </DemoBlock>

      <DemoBlock
        title="深色主题"
        description="theme='dark' 会调暗背景与坐标轴文字,更适合放进深色看板。"
        code={`<Bar3D theme="dark" shading="realistic" ... />`}
      >
        <Bar3D
          xCategories={hours}
          yCategories={days}
          data={trafficMatrix}
          theme="dark"
          shading="realistic"
          colorRange={['#5b8def', '#8b5cf6', '#ec4899']}
        />
      </DemoBlock>

      <h2>API</h2>
      <ApiTable
        rows={[
          {
            prop: 'xCategories',
            desc: 'X 轴类目(柱列)',
            type: 'string[]',
            default: '-',
          },
          {
            prop: 'yCategories',
            desc: 'Y 轴类目(柱行)',
            type: 'string[]',
            default: '-',
          },
          {
            prop: 'data',
            desc: '数据矩阵,data[yIndex][xIndex] = value',
            type: 'number[][]',
            default: '-',
          },
          {
            prop: 'width',
            desc: '容器宽度',
            type: 'number | string',
            default: `'100%'`,
          },
          {
            prop: 'height',
            desc: '容器高度',
            type: 'number | string',
            default: '420',
          },
          {
            prop: 'colorRange',
            desc: '颜色渐变(按值从低到高)',
            type: 'string[]',
            default: `['#5b8def', '#8b5cf6', '#fc4e4e']`,
          },
          {
            prop: 'autoRotate',
            desc: '是否自动旋转',
            type: 'boolean',
            default: 'false',
          },
          {
            prop: 'autoRotateSpeed',
            desc: '自动旋转速度',
            type: 'number',
            default: '8',
          },
          {
            prop: 'barSize',
            desc: '柱体粗细,0 ~ 1',
            type: 'number',
            default: '1',
          },
          {
            prop: 'bevelSize',
            desc: '柱体圆角,0 ~ 1',
            type: 'number',
            default: '0.25',
          },
          {
            prop: 'shading',
            desc: '着色模式',
            type: `'color' | 'lambert' | 'realistic'`,
            default: `'lambert'`,
          },
          {
            prop: 'theme',
            desc: '主题',
            type: `'light' | 'dark'`,
            default: `'light'`,
          },
          { prop: 'title', desc: '标题', type: 'string', default: '-' },
          {
            prop: 'showAxis',
            desc: '是否显示坐标轴',
            type: 'boolean',
            default: 'true',
          },
        ]}
      />
    </>
  );
};

export default Bar3DDoc;
