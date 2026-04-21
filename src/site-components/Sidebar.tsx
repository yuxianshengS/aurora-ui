import React from 'react';
import { NavLink } from 'react-router-dom';
import { navGroups } from '../data/nav';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="site-sidebar">
      {navGroups.map((group) => (
        <div className="site-sidebar__group" key={group.title}>
          <div className="site-sidebar__title">{group.title}</div>
          <ul className="site-sidebar__list">
            {group.items.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
