import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../site-components/Sidebar';
import './DocLayout.css';

const DocLayout: React.FC = () => (
  <div className="doc-layout">
    <Sidebar />
    <main className="doc-layout__main">
      <article className="doc-layout__article">
        <Outlet />
      </article>
    </main>
  </div>
);

export default DocLayout;
