export interface NavItem {
  title: string;
  path: string;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: '指南',
    items: [
      { title: '快速开始', path: '/docs/getting-started' },
      { title: '设计理念', path: '/docs/design' },
    ],
  },
  {
    title: '通用',
    items: [
      { title: 'Button 按钮', path: '/docs/button' },
    ],
  },
  {
    title: '数据录入',
    items: [
      { title: 'Input 输入框', path: '/docs/input' },
      { title: 'Switch 开关', path: '/docs/switch' },
      { title: 'ThemeSwitch 主题切换', path: '/docs/theme-switch' },
      { title: 'DatePicker 日期选择器', path: '/docs/date-picker' },
    ],
  },
  {
    title: '数据展示',
    items: [
      { title: 'Card 卡片', path: '/docs/card' },
      { title: 'Wallet 钱包', path: '/docs/wallet' },
      { title: 'Timeline 时间轴', path: '/docs/timeline' },
    ],
  },
  {
    title: '反馈',
    items: [
      { title: 'Tooltip 文字提示', path: '/docs/tooltip' },
    ],
  },
  {
    title: '可视化',
    items: [
      { title: 'Bar3D 3D 柱状图', path: '/docs/bar3d' },
    ],
  },
];
