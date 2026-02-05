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
import transactionICo from '../../assets/images/transaction.svg';
import MessagesIcon from '../../assets/images/dashboard-6.svg';
import SettingsIcon from '../../assets/images/dashboard-7.svg';
import ToggleIcon from '../../assets/images/toggle-btn.svg';
import collapseLogo from '../../assets/images/collapse-logo.png';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle('sidebar-collapsed', !collapsed);
  };

  const isRouteActive = (menu) => {
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
    // {
    //   name: 'Inventory Management',
    //   icon: InventoryManageIcon,
    //   path: '/inventory-management',
    //   activeRoutes: [
    //     '/inventory-management',
    //     '/inventory-management/add',
    //     '/inventory-management/edit',
    //   ],
    // },
    // { name: 'Category Management', icon: MessagesIcon, path: '/category' },
    // { name: 'Subcategory', icon: MessagesIcon, path: '/sub-category' },
    // {
    //   name: 'Loan Management',
    //   icon: RentalManageIcon,
    //   path: '/loan-management',
    // },
    // {
    //   name: 'EZ pass billing',
    //   icon: EZIcon,
    //   path: '/ez-pass-billing',
    //   activeRoutes: [
    //     '/ez-pass-billing',
    //     '/ez-pass-billing/unmapped-transactions',
    //   ],
    //   subMenu: [
    //     {
    //       name: 'Unmapped Transactions',
    //       path: '/ez-pass-billing/unmapped-transactions',
    //       icon: transactionICo,
    //     },
    //   ],
    // },
    // { name: 'Messages', icon: MessagesIcon, path: '/messages' },
    { name: 'Settings', icon: SettingsIcon, path: '/' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="top-hold">
        <div
          className="logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src="" alt="logo" />
          <img className="logo-collapse" src={collapseLogo} alt="" />
        </div>
        <button className="toggle-nav close-nav" onClick={toggleSidebar}>
          <img src={ToggleIcon} alt="Toggle Sidebar" />
        </button>
        <button className="toggle-nav open-nav" onClick={toggleSidebar}>
          <img src={ToggleIcon} alt="Toggle Sidebar" />
        </button>
      </div>
      <div className="menu-wrp-outer">
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
                className={`nav-link ${menu.subMenu && 'is-sub-menu'} ${
                  isRouteActive(menu) ? 'active open ' : ''
                }`}
              >
                <span className="icon">
                  <img src={menu.icon} alt="menu-icon" />
                </span>
                <span className="txt">{menu.name}</span>
              </Link>

              {menu.subMenu && isRouteActive(menu) && !collapsed && (
                <div className="sub-menu">
                  {menu.subMenu.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      to={sub.path}
                      className={`nav-link ${
                        location.pathname === sub.path ? 'active' : ''
                      }`}
                    >
                      <span className="icon">
                        <img src={sub.icon} alt="menu-icon" />
                      </span>
                      <span className="txt">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
