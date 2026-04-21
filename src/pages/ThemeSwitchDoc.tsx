import React, { useState } from 'react';
import { ThemeSwitch } from '../components';
import { useTheme } from '../hooks/useTheme';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';
import Playground from '../site-components/Playground';

const ThemeSwitchDoc: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h1>ThemeSwitch 主题切换</h1>
      <p>
        一个带有日/夜动画的主题切换开关，基于 Switch 的交互范式扩展，
        天亮时显示太阳与云朵、天黑时显示月亮与星星。
      </p>

      <h2>代码演示</h2>

      <DemoBlock
        title="基础用法"
        code={`<ThemeSwitch defaultChecked={false} />`}
      >
        <ThemeSwitch defaultChecked={false} />
      </DemoBlock>

      <DemoBlock
        title="三种尺寸"
        code={`<ThemeSwitch size="small" />
<ThemeSwitch size="medium" />
<ThemeSwitch size="large" />`}
      >
        <ThemeSwitch size="small" />
        <ThemeSwitch size="medium" />
        <ThemeSwitch size="large" />
      </DemoBlock>

      <DemoBlock
        title="禁用"
        code={`<ThemeSwitch disabled />
<ThemeSwitch disabled defaultChecked />`}
      >
        <ThemeSwitch disabled />
        <ThemeSwitch disabled defaultChecked />
      </DemoBlock>

      <DemoBlock
        title="受控"
        code={`const [checked, setChecked] = useState(false);
<ThemeSwitch checked={checked} onChange={setChecked} />`}
      >
        <ThemeSwitch checked={checked} onChange={setChecked} />
        <span style={{ color: 'var(--au-text-3)', fontSize: 13 }}>
          当前：{checked ? '夜晚' : '白天'}
        </span>
      </DemoBlock>

      <DemoBlock
        title="联动全站主题"
        code={`const { theme, setTheme } = useTheme();
<ThemeSwitch
  checked={theme === 'dark'}
  onChange={(v) => setTheme(v ? 'dark' : 'light')}
/>`}
      >
        <ThemeSwitch
          checked={theme === 'dark'}
          onChange={(v) => setTheme(v ? 'dark' : 'light')}
        />
        <span style={{ color: 'var(--au-text-3)', fontSize: 13 }}>
          当前主题：{theme}
        </span>
      </DemoBlock>

      <h2>交互式调试</h2>
      <Playground
        title="实时调整 ThemeSwitch 属性"
        componentName="ThemeSwitch"
        component={ThemeSwitch}
        controls={[
          { name: 'defaultChecked', type: 'boolean', default: false },
          { name: 'size', type: 'select', options: ['small', 'medium', 'large'], default: 'medium' },
          { name: 'disabled', type: 'boolean', default: false },
        ]}
      />

      <h2>API</h2>
      <ApiTable
        rows={[
          { prop: 'checked', desc: '受控状态（true 为夜晚）', type: 'boolean', default: '-' },
          { prop: 'defaultChecked', desc: '非受控默认值', type: 'boolean', default: 'false' },
          { prop: 'size', desc: '尺寸', type: `'small' | 'medium' | 'large'`, default: `'medium'` },
          { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
          { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
          { prop: 'aria-label', desc: '无障碍标签', type: 'string', default: `'切换主题'` },
          { prop: 'onChange', desc: '状态变更回调', type: '(checked: boolean) => void', default: '-' },
        ]}
      />
    </>
  );
};

export default ThemeSwitchDoc;
