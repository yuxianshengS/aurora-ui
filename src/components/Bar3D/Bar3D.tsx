import React, { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import './Bar3D.css';

export type Bar3DShading = 'color' | 'lambert' | 'realistic';
export type Bar3DTheme = 'light' | 'dark';

export interface Bar3DProps {
  /** X 轴类目 */
  xCategories: string[];
  /** Y 轴类目 */
  yCategories: string[];
  /** 数据矩阵:data[yIndex][xIndex] = value */
  data: number[][];
  /** 容器宽度 */
  width?: number | string;
  /** 容器高度 */
  height?: number | string;
  /** 颜色渐变(按值从低到高) */
  colorRange?: string[];
  /** 自动旋转 */
  autoRotate?: boolean;
  /** 自动旋转速度 */
  autoRotateSpeed?: number;
  /** 柱体粗细,0 ~ 1 */
  barSize?: number;
  /** 柱体圆角,0 ~ 1 */
  bevelSize?: number;
  /** 着色模式 */
  shading?: Bar3DShading;
  /** 主题 */
  theme?: Bar3DTheme;
  /** 标题 */
  title?: string;
  /** 是否显示坐标轴线与网格 */
  showAxis?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LIGHT_AXIS = '#d9d9d9';
const DARK_AXIS = '#3a3a3a';
const LIGHT_LABEL = '#4b5563';
const DARK_LABEL = '#cbd5e1';

const Bar3D: React.FC<Bar3DProps> = ({
  xCategories,
  yCategories,
  data,
  width = '100%',
  height = 420,
  colorRange = ['#5b8def', '#8b5cf6', '#fc4e4e'],
  autoRotate = false,
  autoRotateSpeed = 8,
  barSize = 1,
  bevelSize = 0.25,
  shading = 'lambert',
  theme = 'light',
  title,
  showAxis = true,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instRef = useRef<echarts.ECharts | null>(null);

  const { points, minV, maxV } = useMemo(() => {
    const pts: [number, number, number][] = [];
    data.forEach((row, yi) => {
      row.forEach((v, xi) => {
        pts.push([xi, yi, v]);
      });
    });
    const vals = pts.map((p) => p[2]);
    return {
      points: pts,
      minV: vals.length ? Math.min(...vals) : 0,
      maxV: vals.length ? Math.max(...vals) : 1,
    };
  }, [data]);

  useEffect(() => {
    if (!containerRef.current) return;
    const inst = echarts.init(containerRef.current);
    instRef.current = inst;
    const ro = new ResizeObserver(() => inst.resize());
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      inst.dispose();
      instRef.current = null;
    };
  }, []);

  useEffect(() => {
    const inst = instRef.current;
    if (!inst) return;
    const axisColor = theme === 'dark' ? DARK_AXIS : LIGHT_AXIS;
    const labelColor = theme === 'dark' ? DARK_LABEL : LIGHT_LABEL;

    inst.setOption(
      {
        title: title
          ? {
              text: title,
              left: 'center',
              top: 12,
              textStyle: {
                color: labelColor,
                fontWeight: 500,
                fontSize: 14,
              },
            }
          : undefined,
        tooltip: {
          formatter: (p: { value: [number, number, number] }) => {
            const [xi, yi, v] = p.value;
            return `${yCategories[yi]} / ${xCategories[xi]}<br/><b>${v}</b>`;
          },
        },
        visualMap: {
          show: false,
          min: minV,
          max: maxV,
          inRange: { color: colorRange },
        },
        xAxis3D: {
          type: 'category',
          data: xCategories,
          axisLine: { show: showAxis, lineStyle: { color: axisColor } },
          axisLabel: { color: labelColor },
        },
        yAxis3D: {
          type: 'category',
          data: yCategories,
          axisLine: { show: showAxis, lineStyle: { color: axisColor } },
          axisLabel: { color: labelColor },
        },
        zAxis3D: {
          type: 'value',
          axisLine: { show: showAxis, lineStyle: { color: axisColor } },
          axisLabel: { color: labelColor },
          splitLine: { show: showAxis, lineStyle: { color: axisColor } },
        },
        grid3D: {
          boxWidth: 100,
          boxDepth: 80,
          environment: theme === 'dark' ? '#0f172a' : '#ffffff',
          light: {
            main: { intensity: 1.2, shadow: true, shadowQuality: 'medium' },
            ambient: { intensity: 0.35 },
          },
          viewControl: {
            autoRotate,
            autoRotateSpeed,
            distance: 200,
            alpha: 25,
            beta: 40,
          },
          axisPointer: { lineStyle: { color: axisColor } },
          splitLine: { show: showAxis, lineStyle: { color: axisColor } },
        },
        series: [
          {
            type: 'bar3D',
            data: points,
            shading,
            bevelSize,
            bevelSmoothness: 4,
            barSize,
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                color: '#ffcb6b',
              },
            },
          },
        ],
      },
      true,
    );
  }, [
    points,
    minV,
    maxV,
    xCategories,
    yCategories,
    colorRange,
    autoRotate,
    autoRotateSpeed,
    barSize,
    bevelSize,
    shading,
    theme,
    title,
    showAxis,
  ]);

  return (
    <div
      ref={containerRef}
      className={`au-bar3d au-bar3d--${theme} ${className}`.trim()}
      style={{ width, height, ...style }}
    />
  );
};

export default Bar3D;
