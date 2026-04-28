import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandPalette, Button, Tag, message } from '../components';
import type { CommandItem } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';

const CommandPaletteDoc: React.FC = () => {
  return (
    <>
      <h1>CommandPalette ⌘K 命令面板</h1>
      <p>
        Linear / Stripe / Vercel 风格的全局命令面板。模糊搜索 + 分组 + 键盘导航 + ⌘K
        快捷键 + 焦点管理一应俱全。每个 item 可以挂自定义 onSelect 做导航 / 触发动作 / 切主题等。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法"
        description="按 ⌘K (Mac) / Ctrl+K (Win) 唤起;键盘 ↑↓ 选择, ↵ 执行, ESC 关闭。模糊搜索字段标题/描述/keywords。"
        code={`const items = [
  {
    id: 'home', title: '回到首页', group: '导航',
    shortcut: ['⌘', 'H'],
    onSelect: () => router.push('/'),
  },
  {
    id: 'docs', title: '查看文档', description: '快速开始 / API',
    keywords: ['docs', 'documentation'], group: '导航',
    onSelect: () => router.push('/docs'),
  },
  {
    id: 'theme', title: '切换主题',
    shortcut: ['⌘', 'J'], group: '设置',
    onSelect: () => toggleTheme(),
  },
];

<CommandPalette items={items} />`}
      >
        <BasicDemo />
      </DemoBlock>

      <DemoBlock
        title="受控 + 自定义 hotkey"
        description="open 受控 + 自定义快捷键。hotkey 写法: 'meta+k' / 'ctrl+shift+p' / false 关闭。"
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>手动唤起</Button>
<CommandPalette
  open={open}
  onOpenChange={setOpen}
  hotkey="ctrl+shift+p"   // VSCode 风格
  items={items}
/>`}
      >
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock
        title="异步 onSelect (返回 Promise<false> 阻止关闭)"
        description="onSelect 返回 false / Promise<false> 时不关闭面板,适合 异步加载下一级 / 二次确认 等场景。"
        code={`{
  id: 'delete', title: '危险操作', emphasis: true,
  onSelect: async () => {
    const ok = await confirm('确定?');
    if (!ok) return false; // 不关
  },
}`}
      >
        <AsyncDemo />
      </DemoBlock>

      <h2>API</h2>

      <h3>CommandPalette</h3>
      <ApiTable
        rows={[
          { prop: 'items', desc: '命令列表', type: 'CommandItem[]', default: '-' },
          { prop: 'open', desc: '受控显示', type: 'boolean', default: '-' },
          { prop: 'defaultOpen', desc: '非受控默认显示', type: 'boolean', default: 'false' },
          { prop: 'onOpenChange', desc: '显隐变化', type: '(open) => void', default: '-' },
          { prop: 'hotkey', desc: '全局快捷键(false 关闭)', type: `string | false`, default: `'meta+k' (Mac) / 'ctrl+k' (Win)` },
          { prop: 'placeholder', desc: '输入框 placeholder', type: 'string', default: '内置文案' },
          { prop: 'emptyText', desc: '空结果文案', type: 'ReactNode', default: `'没有匹配的命令'` },
          { prop: 'closeOnSelect', desc: '选中后是否关闭', type: 'boolean', default: 'true' },
          { prop: 'maxHeight', desc: '面板最大高度', type: 'number', default: '420' },
          { prop: 'width', desc: '面板宽度', type: 'number', default: '560' },
          { prop: 'recent', desc: '空搜索时优先显示的最近使用 id 列表', type: 'string[]', default: '-' },
          { prop: 'header', desc: '顶部自定义内容', type: 'ReactNode', default: '-' },
        ]}
      />

      <h3>CommandItem</h3>
      <ApiTable
        rows={[
          { prop: 'id', desc: '唯一 id', type: 'string', default: '-' },
          { prop: 'title', desc: '标题(参与搜索)', type: 'string', default: '-' },
          { prop: 'description', desc: '副标题(参与搜索)', type: 'string', default: '-' },
          { prop: 'keywords', desc: '额外搜索关键词(不显示)', type: 'string[]', default: '-' },
          { prop: 'icon', desc: '左侧图标', type: 'ReactNode', default: '-' },
          { prop: 'shortcut', desc: '右侧快捷键提示, 渲染成 <kbd>', type: 'string[]', default: '-' },
          { prop: 'group', desc: '分组名 (相同的归一组)', type: 'string', default: '-' },
          { prop: 'emphasis', desc: '主色高亮', type: 'boolean', default: 'false' },
          { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
          { prop: 'onSelect', desc: '触发回调; 返回 false / Promise<false> 不关闭', type: '() => void | boolean | Promise<...>', default: '-' },
        ]}
      />
    </>
  );
};

/* ===== demos ===== */

const useCommonItems = (): CommandItem[] => {
  const navigate = useNavigate();
  return [
    {
      id: 'home', title: '回到首页', description: '导航到 /',
      keywords: ['home'], group: '导航', shortcut: ['⌘', 'H'],
      onSelect: () => navigate('/'),
    },
    {
      id: 'docs-getting', title: '快速开始', description: '5 分钟跑起来',
      keywords: ['docs', 'getting-started'], group: '导航',
      onSelect: () => navigate('/docs/getting-started'),
    },
    {
      id: 'docs-button', title: 'Button 文档', description: '按钮组件 API',
      keywords: ['button'], group: '导航',
      onSelect: () => navigate('/docs/button'),
    },
    {
      id: 'docs-table', title: 'Table 文档', description: '表格组件 (含拖拽行/列)',
      keywords: ['table'], group: '导航',
      onSelect: () => navigate('/docs/table'),
    },
    {
      id: 'docs-tour', title: 'Tour 引导', description: '新手引导组件',
      keywords: ['tour', 'onboarding'], group: '导航',
      onSelect: () => navigate('/docs/tour'),
    },
    {
      id: 'theme-light', title: '切换到浅色主题', group: '主题',
      onSelect: () => {
        document.documentElement.setAttribute('data-theme', 'light');
        try { localStorage.setItem('aurora-theme', 'light'); } catch {/*noop*/}
      },
    },
    {
      id: 'theme-dark', title: '切换到深色主题', group: '主题', shortcut: ['⌘', 'J'],
      onSelect: () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('aurora-theme', 'dark'); } catch {/*noop*/}
      },
    },
    {
      id: 'open-builder', title: '打开搭建器', emphasis: true, group: '动作',
      onSelect: () => navigate('/builder'),
    },
  ];
};

const BasicDemo: React.FC = () => {
  const items = useCommonItems();
  return (
    <div>
      <p style={{ marginBottom: 12, color: 'var(--au-text-3)', fontSize: 13 }}>
        在本页面任意位置按 <Tag>⌘ K</Tag> / <Tag>Ctrl K</Tag> 唤起命令面板。
      </p>
      <CommandPalette items={items} />
    </div>
  );
};

const ControlledDemo: React.FC = () => {
  const items = useCommonItems();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        手动唤起 (或按 Ctrl+Shift+P)
      </Button>
      <CommandPalette
        items={items}
        open={open}
        onOpenChange={setOpen}
        hotkey="ctrl+shift+p"
      />
    </>
  );
};

const AsyncDemo: React.FC = () => {
  const items: CommandItem[] = [
    {
      id: 'a', title: '执行 A', description: '点了立刻关闭',
      onSelect: () => { message.success('已执行 A'); },
    },
    {
      id: 'confirm', title: '需要二次确认', description: '点了不关, 等待确认',
      emphasis: true,
      onSelect: async () => {
        const ok = window.confirm('确认执行?');
        if (!ok) {
          message.info('已取消, 面板保持打开');
          return false;
        }
        message.success('已执行');
      },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开</Button>
      <CommandPalette items={items} open={open} onOpenChange={setOpen} hotkey={false} />
    </>
  );
};

export default CommandPaletteDoc;
