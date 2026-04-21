# AuroraUI

轻盈如极光的 React 组件库 & 官网。

## 启动

```bash
npm install
npm run dev
```

默认运行在 http://localhost:5173

## 结构

```
src/
├── components/       # 组件库本体 (Button / Input / Card / Switch)
├── site-components/  # 官网自用组件 (Navbar / Sidebar / DemoBlock / ApiTable)
├── layouts/          # 文档页布局
├── pages/            # 各页面 (Home / GettingStarted / ButtonDoc ...)
├── data/nav.ts       # 左侧导航数据
└── styles/           # 全局样式与 CSS 变量
```

## 新增一个组件

1. 在 `src/components/` 下新建 `YourComp/` 文件夹，添加 `.tsx` + `.css` + `index.ts`
2. 在 `src/components/index.ts` 中导出
3. 在 `src/pages/` 中新建文档页 `YourCompDoc.tsx`
4. 在 `src/App.tsx` 中注册路由
5. 在 `src/data/nav.ts` 中加入导航
