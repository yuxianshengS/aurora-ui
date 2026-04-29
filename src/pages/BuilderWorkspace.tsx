import React from 'react';
import { Link } from 'react-router-dom';
import PageBuilder from '../tools/PageBuilder';
import './BuilderWorkspace.css';

const BuilderWorkspace: React.FC = () => {
  return (
    <div className="builder-page">
      <div className="builder-page__head">
        <div className="builder-page__title-row">
          <h1 className="builder-page__title">页面搭建器</h1>
          <span className="builder-page__badge">开发期工具</span>
          <span className="builder-page__hint">
            拖组件 → 调属性 → 复制 JSX。点工具栏 ⛶ 进全屏获得最大空间。
          </span>
        </div>
        <div className="builder-page__actions">
          <Link to="/docs/getting-started" className="builder-page__link">
            📘 文档
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="builder-page__link"
          >
            ⭐ GitHub
          </a>
        </div>
      </div>

      <div className="builder-page__body">
        <PageBuilder componentName="MyPage" />
      </div>
    </div>
  );
};

export default BuilderWorkspace;
