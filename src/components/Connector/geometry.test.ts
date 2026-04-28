import { describe, it, expect } from 'vitest';
import {
  pickSide,
  anchorAt,
  pathStep,
  pathStepAvoiding,
  type ObstacleRect,
} from './geometry';

const rect = (left: number, top: number, w: number, h: number): DOMRect =>
  ({
    left,
    top,
    right: left + w,
    bottom: top + h,
    width: w,
    height: h,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

describe('pickSide', () => {
  it('右边的对方 → side: right', () => {
    expect(pickSide(rect(0, 0, 100, 100), rect(300, 50, 100, 100))).toBe('right');
  });
  it('左边的对方 → side: left', () => {
    expect(pickSide(rect(300, 0, 100, 100), rect(0, 50, 100, 100))).toBe('left');
  });
  it('正下方对方 → side: bottom', () => {
    expect(pickSide(rect(0, 0, 100, 100), rect(0, 300, 100, 100))).toBe('bottom');
  });
  it('正上方对方 → side: top', () => {
    expect(pickSide(rect(0, 300, 100, 100), rect(0, 0, 100, 100))).toBe('top');
  });
});

describe('anchorAt', () => {
  it('right 边 t=0.5 在矩形右中点', () => {
    const a = anchorAt(rect(10, 10, 100, 50), 'right', 0.5);
    expect(a.x).toBe(110);
    expect(a.y).toBe(35);
  });
  it('top 边 t=0 在左上角', () => {
    const a = anchorAt(rect(10, 10, 100, 50), 'top', 0);
    expect(a.x).toBe(10);
    expect(a.y).toBe(10);
  });
});

describe('pathStep', () => {
  it('horizontal-first: H-V-H 3 段', () => {
    const d = pathStep({ x: 0, y: 0 }, 'right', { x: 100, y: 100 });
    expect(d).toBe('M 0 0 L 50 0 L 50 100 L 100 100');
  });
  it('vertical-first: V-H-V 3 段', () => {
    const d = pathStep({ x: 0, y: 0 }, 'bottom', { x: 100, y: 100 });
    expect(d).toBe('M 0 0 L 0 50 L 100 50 L 100 100');
  });
});

describe('pathStepAvoiding', () => {
  it('无障碍 → 跟 pathStep 一致', () => {
    const r = pathStepAvoiding({ x: 0, y: 0 }, 'right', { x: 100, y: 100 }, []);
    expect(r.d).toBe('M 0 0 L 50 0 L 50 100 L 100 100');
    expect(r.midSegCenter).toEqual({ x: 50, y: 50 });
  });
  it('障碍正中 → mid 推到障碍外侧', () => {
    const obstacle: ObstacleRect = { left: 40, right: 60, top: 30, bottom: 70 };
    const r = pathStepAvoiding(
      { x: 0, y: 0 },
      'right',
      { x: 100, y: 100 },
      [obstacle],
    );
    // 默认 mid_x=50 撞 obstacle 中段, 推到外侧 (right: 60+14=74 OR left: 40-14=26)
    // 50 离 26 距离 24, 离 74 距离 24, 平局取 leftOf (代码逻辑)
    expect([26, 74]).toContain(r.midSegCenter.x);
    expect(r.midSegCenter.y).toBe(50);
  });
});
