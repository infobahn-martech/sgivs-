import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../../assets/css/sidebar.css';

import MainLogo from '../../assets/images/sidenav-logo.svg';
import DashboardIcon from '../../assets/images/dashboard-1.svg';
import UserManageIcon from '../../assets/images/dashboard-2.svg';
import InventoryManageIcon from '../../assets/images/dashboard-3.svg';
import RentalManageIcon from '../../assets/images/dashboard-4.svg';
import MessagesIcon from '../../assets/images/dashboard-5.svg';
import EZIcon from '../../assets/images/dashboard-6.svg';
import SettingsIcon from '../../assets/images/dashboard-7.svg';

const Sidebar = () => {
  const location = useLocation();
  console.log(' location', location);
  const sideMenu = [
    {
      name: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard',
    },
    {
      name: 'User Management',
      icon: UserManageIcon,
      path: '/user-management',
    },
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
    {
      name: 'EZ pass billing',
      icon: EZIcon,
      path: '/ez-pass-billing',
    },
    {
      name: 'Messages',
      icon: MessagesIcon,
      path: '/messages',
    },
    {
      name: 'Settings',
      icon: SettingsIcon,
      path: '/settings',
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={MainLogo} alt="logo" />
      </div>
      <nav className="nav">
        {sideMenu.map((menu, index) => (
          <Link
            to={menu.path}
            className={`nav-link ${
              location.pathname === menu.path ? 'active' : ''
            }`}
            key={index}
          >
            <span className="icon">
              <img src={menu.icon} alt="dashboard-icon" />
            </span>
            <span className="txt">{menu.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
