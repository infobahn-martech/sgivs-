import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import '../../assets/scss/sidebar.scss';

import MainLogo from '../../assets/images/sidenav-logo.svg';
import DashboardIcon from '../../assets/images/dashboard-1.svg';
import UserManageIcon from '../../assets/images/dashboard-2.svg';
import InventoryManageIcon from '../../assets/images/dashboard-3.svg';
import RentalManageIcon from '../../assets/images/dashboard-4.svg';
import MessagesIcon from '../../assets/images/dashboard-5.svg';
import EZIcon from '../../assets/images/dashboard-6.svg';
import SettingsIcon from '../../assets/images/dashboard-7.svg';
import ToggleIcon from '../../assets/images/toggle-btn.svg';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle('sidebar-collapsed', !collapsed);
  };

  const sideMenu = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/' },
    { name: 'User Management', icon: UserManageIcon, path: '/user-management' },
    {
      name: 'Inventory Management',
      icon: InventoryManageIcon,
      path: '/inventory-management',
    },
    {
      name: 'Rental Management',
      icon: RentalManageIcon,
      path: '/rental-management',
    },
    { name: 'EZ pass billing', icon: EZIcon, path: '/ez-pass-billing' },
    { name: 'Messages', icon: MessagesIcon, path: '/messages' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="top-hold">
        <div className="logo">
          <img src={MainLogo} alt="logo" />
        </div>
        <button className="toggle-nav" onClick={toggleSidebar}>
          <img src={ToggleIcon} alt="Toggle Sidebar" />
        </button>
      </div>
      <nav className="nav">
        {sideMenu.map((menu, index) => (
          <Fragment key={index}>
            <Tooltip
              id={`tooltip-${index}`}
              place="right"
              style={{
                backgroundColor: '#2ca0da',
                maxWidth: 500,
                marginBottom: '10px',
              }}
            />
            <span
              className="icon"
              data-tooltip-content={menu.name}
              data-tooltip-hidden={!collapsed}
              data-tooltip-id={`tooltip-${index}`}
            >
              <Link
                to={menu.path}
                className={`nav-link ${
                  location.pathname === menu.path ? 'active' : ''
                }`}
                key={index}
              >
                <img src={menu.icon} alt="menu-icon" />
                <span className="txt p-2">{menu.name}</span>
              </Link>
            </span>
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
