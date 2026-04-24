import React from 'react';

const GettingStarted: React.FC = () => (
  <>
    <h1>快速开始</h1>
    <p>
      欢迎使用 <strong>AuroraUI</strong>。按照下面的步骤，你可以在几分钟内在
      React 项目中接入我们的组件。
    </p>

    <h2>安装</h2>
    <p>使用你喜欢的包管理器：</p>
    <pre>
      <code>
        {`# npm
npm install aurora-ux

# pnpm
pnpm add aurora-ux

# yarn
yarn add aurora-ux`}
      </code>
    </pre>

    <h2>引入样式</h2>
    <p>
      在应用入口（如 <code>main.tsx</code>）中引入基础样式：
    </p>
    <pre>
      <code>{`import 'aurora-ux/dist/style.css';`}</code>
    </pre>

    <h2>使用组件</h2>
    <pre>
      <code>
        {`import { Button, Card } from 'aurora-ux';

export default function App() {
  return (
    <Card title="Hello AuroraUI">
      <Button type="primary">开始使用</Button>
    </Card>
  );
}`}
      </code>
    </pre>

    <h2>按需引入</h2>
    <p>
      所有组件均支持 Tree Shaking，直接从包根导入即可，打包工具会自动剔除未使用的代码。
    </p>

    <h2>主题定制</h2>
    <p>
      AuroraUI 的所有视觉变量都基于 CSS Variables，在你的全局样式中覆盖即可：
    </p>
    <pre>
      <code>
        {`:root {
  --au-primary: #ff6a88;
  --au-radius: 14px;
}`}
      </code>
    </pre>

    <h2>下一步</h2>
    <p>
      你可以从左侧导航进入具体的组件文档，查看每个组件的用法、可选属性与示例。
    </p>
  </>
);

export default GettingStarted;
