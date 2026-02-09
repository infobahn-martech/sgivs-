import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import '../../assets/scss/sidebar.scss';

import MainLogo from '../../assets/images/MLO.png';
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
    // Employee Management
    {
      name: 'Employee Management',
      icon: MessagesIcon,
      path: '/employee-management',
      activeRoutes: ['/employee-management', '/role-management', '/designation-management'],
      subMenu: [
        { name: 'Employees', icon: UserManageIcon, path: '/employee-management' },
        { name: 'Employee role', path: '/role-management', icon: MessagesIcon },
        {
          name: 'Employee designation',
          path: '/designation-management',
          icon: MessagesIcon,
        },
      ],
    },

    // Centers
    {
      name: 'Centers',
      icon: MessagesIcon,
      path: '/center',
      activeRoutes: ['/center', '/counter-management'],
      subMenu: [
        { name: 'Center', path: '/center', icon: MessagesIcon },
        { name: 'Counter', path: '/counter-management', icon: MessagesIcon },
      ],
    },

    // Miscellaneous
    {
      name: 'Miscellaneous',
      icon: MessagesIcon,
      path: '/appointment-type-management',
      activeRoutes: [
        '/appointment-type-management',
        '/collection-type-management',
        '/application-mode-management',
        '/application-type-management',
        '/courier-type-management',
        '/visa-duration-management',
        '/visa-entry-management',
      ],
      subMenu: [
        {
          name: 'Appointment type',
          path: '/appointment-type-management',
          icon: MessagesIcon,
        },
        {
          name: 'Collection type',
          path: '/collection-type-management',
          icon: MessagesIcon,
        },
        {
          name: 'Application mode',
          path: '/application-mode-management',
          icon: MessagesIcon,
        },
        {
          name: 'Application type',
          path: '/application-type-management',
          icon: MessagesIcon,
        },
        { name: 'Courier type', path: '/courier-type-management', icon: MessagesIcon },
        { name: 'Visa Duration', path: '/visa-duration-management', icon: MessagesIcon },
        { name: 'Visa Entry', path: '/visa-entry-management', icon: MessagesIcon },
      ],
    },

    // Service Management
    {
      name: 'Service Management',
      icon: MessagesIcon,
      path: '/service-management',
      activeRoutes: [
        '/service-management',
        '/visa-duration-management',
        '/visa-entry-management',
        '/optional-services',
        '/visa-service-management',
      ],
      subMenu: [
        { name: 'Services', path: '/service-management', icon: MessagesIcon },
        { name: 'Visa Duration', path: '/visa-duration-management', icon: MessagesIcon },
        { name: 'Visa Entry', path: '/visa-entry-management', icon: MessagesIcon },
        { name: 'Optional Services', path: '/optional-services', icon: MessagesIcon },
        { name: 'Visa Service', path: '/visa-service-management', icon: MessagesIcon },
      ],
    },

    // Appointment Settings
    {
      name: 'Appointment Settings',
      icon: MessagesIcon,
      path: '/appointment-settings',
    },

    { name: 'Settings', icon: SettingsIcon, path: '/' },
  ];

  // ✅ submenu open/close state (click based)
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // ✅ auto-open menu based on current route
  useEffect(() => {
    const activeIndex = sideMenu.findIndex((m) => m.subMenu && isRouteActive(m));
    if (activeIndex !== -1) setOpenMenuIndex(activeIndex);
  }, [location.pathname]);

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
                  backgroundColor: '#051a53',
                  maxWidth: 500,
                  marginBottom: '10px',
                }}
              />

              <Link
                data-tooltip-content={menu.name}
                data-tooltip-hidden={!collapsed}
                data-tooltip-id={`tooltip-${index}`}
                to={menu.subMenu ? '#' : menu.path}
                onClick={(e) => {
                  if (menu.subMenu) {
                    e.preventDefault();
                    setOpenMenuIndex((prev) => (prev === index ? null : index));
                  }
                }}
                className={`nav-link ${menu.subMenu && 'is-sub-menu'} ${isRouteActive(menu) || openMenuIndex === index ? 'active open ' : ''
                  }`}
              >
                <span className="icon">
                  <img src={menu.icon} alt="menu-icon" />
                </span>
                <span className="txt">{menu.name}</span>

                {menu.subMenu && (
                  <span className={`arrow ${openMenuIndex === index ? 'rotate' : ''}`}>
                    ❯
                  </span>
                )}
              </Link>

              {menu.subMenu && openMenuIndex === index && !collapsed && (
                <div className="sub-menu">
                  {menu.subMenu.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      to={sub.path}
                      className={`nav-link ${location.pathname === sub.path ? 'active' : ''
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
