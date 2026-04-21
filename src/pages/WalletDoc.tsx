import React from 'react';
import { Wallet } from '../components';
import type { WalletCard } from '../components';
import DemoBlock from '../site-components/DemoBlock';
import ApiTable from '../site-components/ApiTable';
import Playground from '../site-components/Playground';

const defaultCards: WalletCard[] = [
  {
    brand: 'Stripe',
    background: '#635bff',
    label: 'Holder',
    value: 'ALEX SMITH',
    masked: '**** 4242',
    number: '5524 9910 4242',
  },
  {
    brand: 'Wise',
    background: '#9bd86a',
    label: 'Business',
    value: 'STUDIO LLC',
    masked: '**** 8810',
    number: '9012 4432 8810',
  },
  {
    brand: (
      <>
        Pay<b style={{ color: '#0079C1' }}>Pal</b>
      </>
    ),
    background: '#ffffff',
    color: '#003087',
    chipColor: 'rgba(0, 0, 0, 0.05)',
    labelColor: '#8c979d',
    label: 'Email',
    value: 'hello@work.com',
    masked: '**** 0094',
    number: '3312 0045 0094',
  },
];

const DemoPlayground: React.FC<{
  pocketColor?: string;
  eyeColor?: string;
  balance?: string;
  balanceLabel?: string;
  balanceMask?: string;
  hint?: string;
}> = ({ pocketColor, eyeColor, balance, balanceLabel, balanceMask, hint }) => (
  <Wallet
    cards={defaultCards}
    balance={balance || '$12,450.00'}
    balanceLabel={balanceLabel}
    balanceMask={balanceMask}
    hint={hint === '' ? null : hint}
    pocketColor={pocketColor}
    eyeColor={eyeColor}
  />
);

const WalletDoc: React.FC = () => (
  <>
    <h1>Wallet 钱包</h1>
    <p>
      一个拟物化的钱包组件：鼠标悬停时卡片会从口袋中展开以扇形呈现，
      同时显示隐藏的余额；单独悬停某张卡片会进一步前置并显示完整卡号。
    </p>

    <h2>何时使用</h2>
    <p>
      展示用户的多张支付方式与账户余额；也可以作为产品落地页上"看点"式的视觉展示件。
    </p>

    <h2>代码演示</h2>

    <DemoBlock
      title="基础用法"
      description="传入 cards 数组与 balance 即可；悬停查看卡片与余额。"
      code={`const cards = [
  { brand: 'Stripe', background: '#635bff', label: 'Holder', value: 'ALEX SMITH', masked: '**** 4242', number: '5524 9910 4242' },
  { brand: 'Wise',   background: '#9bd86a', label: 'Business', value: 'STUDIO LLC', masked: '**** 8810', number: '9012 4432 8810' },
  { brand: <>Pay<b style={{ color: '#0079C1' }}>Pal</b></>, background: '#ffffff', color: '#003087', chipColor: 'rgba(0,0,0,0.05)', labelColor: '#8c979d', label: 'Email', value: 'hello@work.com', masked: '**** 0094', number: '3312 0045 0094' },
];

<Wallet cards={cards} balance="$12,450.00" />`}
    >
      <Wallet cards={defaultCards} balance="$12,450.00" />
    </DemoBlock>

    <DemoBlock
      title="自定义口袋与提示"
      description="通过 pocketColor / eyeColor 调整皮革与眼睛图标颜色,hint 可替换底部的提示文案。"
      code={`<Wallet
  cards={cards}
  balance="¥ 38,900"
  balanceLabel="账户余额"
  hint="悬停查看详情"
  pocketColor="#2a1f4d"
  eyeColor="#7c5cff"
/>`}
    >
      <Wallet
        cards={defaultCards}
        balance="¥ 38,900"
        balanceLabel="账户余额"
        hint="悬停查看详情"
        pocketColor="#2a1f4d"
        eyeColor="#7c5cff"
      />
    </DemoBlock>

    <DemoBlock
      title="隐藏提示"
      description="传 hint={null} 隐藏底部的行动提示。"
      code={`<Wallet cards={cards} balance="$9,800" hint={null} />`}
    >
      <Wallet cards={defaultCards} balance="$9,800" hint={null} />
    </DemoBlock>

    <h2>交互式调试</h2>
    <Playground
      title="实时调整 Wallet 属性"
      description="调整右侧控件,立刻预览钱包的颜色、余额与提示语。"
      componentName="Wallet"
      component={DemoPlayground}
      controls={[
        { name: 'balance', type: 'text', label: 'balance', default: '$12,450.00' },
        { name: 'balanceLabel', type: 'text', label: 'balanceLabel', default: 'Total Balance' },
        { name: 'balanceMask', type: 'text', label: 'balanceMask', default: '******' },
        { name: 'hint', type: 'text', label: 'hint', default: 'Hover to see Balance' },
        { name: 'pocketColor', type: 'text', label: 'pocketColor', default: '#1e341e' },
        { name: 'eyeColor', type: 'text', label: 'eyeColor', default: '#3be60b' },
      ]}
    />

    <h2>API</h2>
    <h3>Wallet</h3>
    <ApiTable
      rows={[
        { prop: 'cards', desc: '卡片列表(最顶上的一张在数组最后)', type: 'WalletCard[]', default: '-' },
        { prop: 'balance', desc: '余额展示内容', type: 'ReactNode', default: '-' },
        { prop: 'balanceLabel', desc: '余额下方的说明文字', type: 'string', default: `'Total Balance'` },
        { prop: 'balanceMask', desc: '未悬停时的遮罩字符', type: 'string', default: `'******'` },
        { prop: 'hint', desc: '底部提示文字,传 null 隐藏', type: 'ReactNode | null', default: `'Hover to see Balance'` },
        { prop: 'pocketColor', desc: '口袋皮革颜色', type: 'string', default: `'#1e341e'` },
        { prop: 'pocketStitchColor', desc: '口袋缝线颜色', type: 'string', default: `'#3d5635'` },
        { prop: 'eyeColor', desc: '眼睛图标颜色', type: 'string', default: `'#3be60b'` },
      ]}
    />
    <h3>WalletCard</h3>
    <ApiTable
      rows={[
        { prop: 'brand', desc: '卡片顶部品牌名', type: 'ReactNode', default: '-' },
        { prop: 'background', desc: '卡面背景色', type: 'string', default: '-' },
        { prop: 'color', desc: '卡面文字颜色', type: 'string', default: `'#fff'` },
        { prop: 'label', desc: '左下角标签(如 Holder)', type: 'string', default: '-' },
        { prop: 'value', desc: '左下角值(如持卡人)', type: 'ReactNode', default: '-' },
        { prop: 'masked', desc: '收起时显示的尾号', type: 'string', default: '-' },
        { prop: 'number', desc: '单独悬停时展开的完整卡号', type: 'string', default: '-' },
        { prop: 'chipColor', desc: '芯片背景色', type: 'string', default: 'rgba(255,255,255,0.2)' },
        { prop: 'labelColor', desc: '标签文字颜色', type: 'string', default: '-' },
      ]}
    />
  </>
);

export default WalletDoc;
