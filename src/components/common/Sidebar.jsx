import React, { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import '../../assets/scss/sidebar.scss';

import MainLogo from '../../assets/images/sidenav-logo.svg';
import DashboardIcon from '../../assets/images/dashboard-1.svg';
import UserManageIcon from '../../assets/images/dashboard-2.svg';
import InventoryManageIcon from '../../assets/images/dashboard-3.svg';
import RentalManageIcon from '../../assets/images/dashboard-4.svg';
import EZIcon from '../../assets/images/dashboard-5.svg';
import MessagesIcon from '../../assets/images/dashboard-6.svg';
import SettingsIcon from '../../assets/images/dashboard-7.svg';
import ToggleIcon from '../../assets/images/toggle-btn.svg';
import collapseLogo from '../../assets/images/collapse-logo.png';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle('sidebar-collapsed', !collapsed);
  };

  const isRouteActive = (menu) => {
    // Default to exact path match if no activeRoutes specified
    const routesToCheck = menu.activeRoutes || [menu.path];

    return routesToCheck.some(
      (route) =>
        route === location.pathname ||
        (route !== '/' && location.pathname.startsWith(route))
    );
  };

  const sideMenu = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/' },
    { name: 'User Management', icon: UserManageIcon, path: '/user-management' },
    {
      name: 'Inventory Management',
      icon: InventoryManageIcon,
      path: '/inventory-management',
      activeRoutes: [
        '/inventory-management',
        '/inventory-management/add',
        '/inventory-management/edit',
      ],
    },
    {
      name: 'Loan Management',
      icon: RentalManageIcon,
      path: '/loan-management',
    },
    { name: 'EZ pass billing', icon: EZIcon, path: '/ez-pass-billing' },
    { name: 'Messages', icon: MessagesIcon, path: '/messages' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="top-hold">
        <div
          className="logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={MainLogo} alt="logo" />
          <img className="logo-collapse" src={collapseLogo} alt="" />
        </div>
        <button className="toggle-nav  close-nav" onClick={toggleSidebar}>
          <img src={ToggleIcon} alt="Toggle Sidebar" />
        </button>
        <button className="toggle-nav  open-nav" onClick={toggleSidebar}>
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

            <Link
              data-tooltip-content={menu.name}
              data-tooltip-hidden={!collapsed}
              data-tooltip-id={`tooltip-${index}`}
              to={menu.path}
              className={`nav-link ${isRouteActive(menu) ? 'active' : ''}`}
              key={index}
            >
              <span className="icon">
                <img src={menu.icon} alt="menu-icon" />
              </span>
              <span className="txt">{menu.name}</span>
            </Link>
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
