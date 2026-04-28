# Changelog

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [Unreleased]

### 新增 — 国际化基础
- **`<ConfigProvider>` 组件** + `useLocale()` / `useConfig()` hook — 全局注入 locale 包 + 主色
- `Locale` 接口涵盖 8 类组件文案(Pagination / Tour / Modal / Result / Empty / Table / Upload / Common)
- 内置 `zhCN`(默认)/ `enUS` 两个 locale 包,`Result` / `Empty` / `Tour` 已接入,prop 优先级最高仍可覆盖
- `primaryColor` 写到 `document.documentElement` 而非包裹 div — 既不破坏外层布局,又能覆盖到 portal 渲染的 Modal / Drawer / Tooltip / Tour 等弹层

### 新增 — Tour 引导组件 (零依赖)
- 步骤数组 + 高亮目标 + 气泡卡片,`portal` 渲染 + `useFocusTrap` + ESC/←/→ 键盘
- spotlight 用 `box-shadow: 0 0 0 100vmax` 反向阴影抠洞,GPU 友好,step 切换 transition 平滑
- target 支持 `HTMLElement | string (CSS 选择器) | () => HTMLElement | null`
- `step.actions` 完全自定义底部按钮区(拿到 next/prev/close/goTo);`step.onNext` 拦截前进(返回 false 阻止)
- `closable={false}` 强制走完;`scrollIntoViewOptions` 滚动策略可控
- 文档站 9 个 demo 含首次访问 localStorage、分支引导、异步校验、合规强引导、CSS 选择器引导

### 新增 — Form 表单 API 补齐
- `isFieldTouched(name)` / `isFieldsTouched(names?, allTouched?)` — 字段 dirty 跟踪
- `setFields([{name, value?, errors?, touched?}])` — 一次性回写多字段(适合服务端校验失败、恢复草稿快照)

### 修复
- **拖动期间禁用 body 文本选中** — Slider / DayTimeline 拖动时不会蓝选页面文本
- **`vite-plugin-dts` 的 include 扩展到 hooks/ + locale/** — 之前 lib.ts 导出的 useTheme/useFocusTrap/Locale/zhCN/enUS 在 dist d.ts 中缺类型

### 移除 — 重要
- **删除 Bar3D 组件** — 依赖 echarts + echarts-gl 共 ~1MB raw / 326KB gzip,体积代价过高,使用率低,移交给消费者按需自接
- 同步清理 `peerDependencies` 中的 `echarts` / `echarts-gl`,vite 的 manualChunks 也去掉对应规则

### 新增 — 组件能力
- **Table 行/列拖拽**(零依赖,原生 HTML5 Drag API):`draggableRows` / `draggableColumns` / `onRowReorder` / `onColumnReorder`,drop 指示线用 `box-shadow: inset` 绘制,拖列不影响 sorter 点击
- **Tooltip 大改**:`createPortal` 渲染避免被 `overflow:hidden` 裁切;新增 `trigger='click'/'hover'/'focus'`(组合);新增 `mouseEnterDelay` / `mouseLeaveDelay` 防闪烁;新增 `onOpenChange` / `disabled`;`forwardRef` + 暗模式 token
- **TreeSelect portal 化**:跟 Select / Dropdown 同 portal 模式,新增 `popupMaxHeight`,scroll/resize/ESC 跟随
- **Modal / Drawer focus trap**:Tab/Shift+Tab 在面板内循环,关闭时还原焦点到打开前的元素;新建 `useFocusTrap` 共享 hook
- **Tabs 键盘导航**:ArrowLeft/Right/Up/Down + Home/End 切换,符合 WAI-ARIA Tabs pattern
- **Menu 键盘导航**:Enter/Space 触发 + ArrowDown/Up 同级移焦
- **Card onClick a11y**:传 onClick 时自动 `role="button"` + `tabIndex={0}` + Enter/Space 触发 + `:focus-visible` 焦点环

### 新增 — forwardRef + displayName
- 表单控件:Input / InputNumber / Switch / Checkbox / Radio / Slider
- 展示组件:Card / Tag / Avatar / Alert / Tooltip
- 共 11 个组件可被外部 ref 拿到,与 React Hook Form / focus 管理 / scrollIntoView 集成更顺

### 改进 — 工程 / 性能
- **可视化组件加 React.memo**:Sparkline / Heatmap / Funnel / Gauge — 父级随便 setState 不再带累整图重算
- **PdfDownload 动态加载**:`html2canvas` + `jspdf`(~186KB gzip)从顶部静态 import 改成 `exportPdf()` 内 `await import()`,只有用户点"下载"时才拉
- **z-index 全局 token 化**:`--au-z-affix/modal/popup/tooltip/spin/message`,修正之前 Modal(1000) 内的 Dropdown(1050) 反而盖住 Modal 的 stacking 错乱
- **iconfont CDN preconnect**:`<link rel="preconnect">` 提前 DNS+TLS,首屏 ~100ms FCP 收益
- **index.html SEO 补全**:description / theme-color / Open Graph / Twitter Card
- **lib 入口导出 hooks**:`useTheme` / `useFocusTrap` 可被消费者复用
- **`<img>` 普遍 `loading="lazy" decoding="async"`**:Avatar / Empty / ActivityFeed / Upload

### 改进 — 文档与示例
- 全量纠正 demo `code` prop 与实际渲染的 1:1 对齐(15+ doc 文件):删除 `={...}` / `...省略...` 等占位符,补齐 emoji icon 替换为真实 `<Icon name="..." />`
- IconDoc 增量渲染(IntersectionObserver):首屏只挂 120 个 button,滚动追加,慢机首屏 LCP 节点数 -78%
- AvatarDoc 去掉 `i.pravatar.cc` 外链,改成内联 SVG dataURL,断网/CDN 抖动也能跑

### 修复
- **Gauge SVG 渐变 id 改用 `useId()`**,SSR / RSC 不再 hydration mismatch
- **Pagination / Modal.confirm / Dropdown 的 setTimeout 全部 ref 化**,unmount 时清理避免 setState on unmounted
- **react-router-dom 从 dependencies 挪到 devDependencies**(组件库本身不用,只 docs/builder 用)
- **Tag 暗模式色彩**:`info/purple/magenta/cyan` 在暗主题下提一档亮度
- **添加 LICENSE 文件**(MIT,与 package.json 字段对齐)
- **package.json keywords**:去掉错误的 `tailwind`,补 `aurora` `kpi` `echarts` `data-visualization` `react18`

## [0.7.0] — 2026-04-28 — Polish & Quality

### 改进 — 工程
- echarts 按需引入: Bar3D 改用 `echarts/core` + `echarts.use([...])`, **vendor-echarts chunk 1036 → 480 KB (砍 54%)**
- 加 vitest 单测基建: geometry helpers (pickSide / anchorAt / pathStep / pathStepAvoiding) + FormStore (required/type/min/max/whitespace/validator/validateFields), **20 个测试通过**
- vite lib 模式 external 改成正则匹配 echarts 子路径, 防止 `echarts/core` 被打进包
- README 加 iconfont CDN 引入说明

### 改进 — Connector
- `flow` prop: 沿线移动的小圆点 (粒子). 用 SVG 原生 `<animateMotion>` + `<mpath>`, 路径变化自动跟随
- 圆点裁剪 keyPoints 让出箭头, 不压在 marker 上
- `autoAvoid` + `obstacles` props (MVP 单障碍 1-bend), 单条 `avoid` 也可单独开
- 标签从 SVG 内部 `<foreignObject>` 抽到外部 HTML div + 单独 z-index 层, 不被节点遮挡
- 滚动坐标 bug 修复: 加回 `scrollLeft/Top` 让 path 在容器 scroll 时不偏移
- z-index: -1 沉到节点下避免覆盖
- 拖动通过 mousemove 监听同步追踪
- 全部 demo 的代码片段改为聚焦 Connector 关键代码, 不引 Box/NetNode/FNode 等本地 helper

### 改进 — 路由
- BrowserRouter → HashRouter 让 GH Pages 任意子路由刷新不 404

### 改进 — 文档
- 5 个图谱场景文档页 (网络拓扑 / 流程图 / 依赖关系 / 数据血缘 / 思维导图)
- "图与拓扑" 单独 nav 类目
- 首页加 Connector 主题专栏 (迷你 API Gateway 拓扑 + 5 用例缩略卡)
- DemoBlock 代码块加 JSX/TS 语法高亮
- README 加 "图与拓扑" 类目展示

## [0.6.0] — 2026-04-27 — Diagram Edition

### 新增 — Connector 升格为主题能力
- 首页新加 **"用 Connector 画任何关系图"** 专栏: 迷你 API Gateway 拓扑实时演示 + 5 用例缩略卡 (网络拓扑/流程图/依赖关系/数据血缘/思维导图) + CTA
- 导航栏拆出**"图与拓扑"**类目, Connector 从极光特效组移出
- 4 个新文档页, 每页一个完整真实场景:
  - `/docs/flowchart` 订单审批流 (条件分支 + 驳回回流 + orthogonal U 型)
  - `/docs/dependency-graph` 电商微服务调用图 (3 层架构 + RPC + MQ async + 缓存)
  - `/docs/data-lineage` 数据血缘 (源头 → CDC → 湖 → ETL → 仓库 → BI/AI/风控)
  - `/docs/mindmap` 产品规划思维导图 (中心放射 + 4 主分支 + 12 leaves)

### 改进
- 网络拓扑图默认 type 从 curve 改为 step (网络图标准画法), 节点间距和舞台尺寸大幅放大
- HashRouter 替代 BrowserRouter, GH Pages 任意子路由刷新不再 404

### Routing
- BrowserRouter → HashRouter; URL 形式 `/aurora-ux/#/docs/...`

## [0.5.0] — 2026-04-27

### 新增 — Connector 连接线
- **ConnectorGroup + Connector** 双层组件: 共享一个 SVG 渲染所有线, 内部用 React context 注册
- **3 种连接关系**: 1-1 / 一对多 / 多对多 (默认 mesh 笛卡尔积, 可切 pairs 一一配对)
- **4 种线形**: curve (三次贝塞尔) / step (90° 折线) / orthogonal (圆角折线) / straight
- 自动决定 startSide / endSide; 同一节点同一边多线时 **沿边均匀分布**, 不堆中点
- 极光渐变 stroke (linearGradient 跟随线段方向), 流动虚线, 单端/双端/无箭头, 中点 label
- **ResizeObserver + 全局 scroll/resize** 联合监听, RAF 节流, 拖动节点连线实时跟随
- 数据 API (`connections` + `ids`) 与 JSX (`<Connector>`) 两种写法共存
- Portal 到 body 走 fixed 定位 (跨视口) 或贴在指定 container 内 (相对定位)

## [0.4.0] — 2026-04-27

### 新增 — 极光特效 #2 系列
- **PulseDot** 实时脉冲点: 6 套预设 (live/success/warning/danger/info/default), 可静音, 节奏可调
- **TickerTape** 横向跑马灯: 涨跌方向自动配色 + 三角箭头, 鼠标悬停暂停, 双向滚动
- **ScrambleText** 字符乱码重组: 逐字锁定 + 字符集可换, 支持 `trigger` 重播 + `onDone` 回调

### 改进 — 工程
- 路由全部改 `React.lazy` + `Suspense` 懒加载, **首屏 chunk 从 922KB → 17KB gzip (53× 缩减)**
- vendor 拆分: echarts / echarts-gl / jspdf+html2canvas / react / react-dom / react-router 各自独立 chunk
- README 重写覆盖 60+ 组件 + 极光招牌; 新增 CHANGELOG.md

## [0.3.0] — 2026-04-27

### 新增 — 极光特效系列
- **AuroraBg** 极光动态渐变背景: 5 套预设 (aurora / sunset / ocean / forest / cosmic), 4 个色带飘动 + 颗粒纹理 + `fixed` 整页模式
- **GradientText** 渐变流动文字: 6 套预设, 支持 `as` 切换语义元素 (h1/h2/...), 流动动画
- **NumberRoll** 翻牌器式数字滚动: 每位独立滚动 + stagger 延迟, 千分位 / 小数 / 前后缀
- **GlowCard** 鼠标跟随发光卡片: 光晕跟随 + conic-gradient 旋转描边

### 新增 — PageBuilder Section 模板系统
- 整段预设可一键拖入, 落地为透明的 BlockConfig 树, 每个节点都能继续编辑
- 6 个内置模板: Hero / Pricing 3 列 / Feature 3 列 / Stats / CTA / KPI 4 列
- 新增"极光特效"组件分类

### 改进 — 网站
- 首页彻底重做, 用极光招牌组件做 Hero / 招牌墙 / KPI 看板示意 / 6 张特性卡 / 深色 IDE 代码片段
- 指南页 `/docs/getting-started` + `/docs/design` 重做, 4 步走 + 5 大原则 + 5 套色板 + 间距尺度可视化 + 缓动曲线演示
- 样板看板 `/examples/dashboard` 加 Aurora Hero banner + 实时跳动 GMV/订单/转化 + GlowCard 健康度卡 + iconfont 替换全部 emoji

## [0.2.0] — 2026-04-23

### 新增
- **Form / FormItem / useForm** 完整重写, 提供真实的校验能力:
  - `Rule[]`: required / type / min / max / len / pattern / whitespace / validator (含 Promise) / validateTrigger
  - `FormInstance`: getFieldValue / setFieldsValue / validateFields / resetFields / submit
  - `onFinish` / `onFinishFailed` / `onValuesChange` 事件
- 新增 8 个常用组件: **Skeleton** · **Statistic** · **Progress** · **Description** · **Result** · **Upload** · **Tree** · **TreeSelect**

### 变更
- **PageShell → Layout** 重命名 (`au-shell` → `au-layout`, `LayoutMode` 类型导出)
- PageBuilder Form 块从硬编码示例改为真实容器, FormItem.* schemas 暴露 `_rules` JSON 字段

## [0.1.1] — 2026-04-21

首个公开发布版本。

### 包含的组件
通用 (Button / Icon / Text), 表单 (Input / InputNumber / Select / Radio / Checkbox / Switch / Slider / DatePicker), 数据展示 (Card / Wallet / Timeline / DayTimeline / Tag / Badge / Avatar / Empty / Pagination / Tabs / Table), 反馈 (Modal / Drawer / Message / Notification / Popconfirm / Alert / Spin / Tooltip / FullscreenProgress / TopProgress), 导航 (Menu / Breadcrumb / Steps / Dropdown), 可视化 (KpiCard / Sparkline / Gauge / Funnel / Heatmap / ActivityFeed / Bar3D), 布局 (Row / Grid / Flex / Space / Divider / Split / PageShell), 动效 (Typewriter / Flip / Draggable / PdfDownload).

### 工具
- **PageBuilder** 拖拽搭建器, 支持 Hoister 大数据提升 / Copy JSX / 容器嵌套
- **ThemeSwitch** 暗亮主题切换
- 在线预览站 + iconfont 同步脚本

[Unreleased]: https://github.com/yuxianshengS/aurora-ux/compare/v0.7.0...HEAD
[0.7.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/yuxianshengS/aurora-ux/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/yuxianshengS/aurora-ux/releases/tag/v0.1.1
