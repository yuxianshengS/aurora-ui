import React from 'react';

const Design: React.FC = () => (
  <>
    <h1>设计理念</h1>
    <p>
      AuroraUI 的设计灵感源自北极光 —— 自然、流动、优雅。我们希望组件库不止是一组可用的零件，
      更是一种审美的延伸，帮助产品团队在每一个细节上传递专业与温度。
    </p>

    <h2>三条基本原则</h2>
    <h3>一致</h3>
    <p>
      统一的间距、圆角、配色与动效。相似的交互模式带来相似的表现，降低用户的学习成本。
    </p>
    <h3>克制</h3>
    <p>
      不为表现而表现。每一处阴影、每一次动画都有其存在的理由，避免信息噪声。
    </p>
    <h3>开放</h3>
    <p>
      组件暴露合理的扩展点，开发者可以通过 props、children、CSS 变量自由调整，
      而不必 fork 内部实现。
    </p>

    <h2>色彩系统</h2>
    <p>
      主色采用通透的极光蓝 <code>#5b8def</code>，辅以紫与青的渐变点缀，
      既保持专业感，又留有生气。
    </p>
    <div
      style={{
        display: 'flex',
        gap: 12,
        margin: '16px 0 32px',
        flexWrap: 'wrap',
      }}
    >
      {[
        ['#5b8def', 'Primary'],
        ['#22c55e', 'Success'],
        ['#f59e0b', 'Warning'],
        ['#ef4444', 'Danger'],
        ['#1f2937', 'Text'],
      ].map(([c, n]) => (
        <div key={c} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: c,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <div style={{ fontSize: 12, marginTop: 6, color: '#4b5563' }}>
            {n}
            <br />
            <code style={{ fontSize: 11 }}>{c}</code>
          </div>
        </div>
      ))}
    </div>

    <h2>间距与尺寸</h2>
    <p>
      我们采用 4 的倍数作为基础间距单位（4 / 8 / 12 / 16 / 20 / 24 ...），
      圆角默认 <code>10px</code>，在柔和与锐利之间取得平衡。
    </p>
  </>
);

export default Design;
