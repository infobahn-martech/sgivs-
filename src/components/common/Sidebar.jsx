import React from 'react';

import MainLogo from '../../assets/images/sidenav-logo.svg'
import DashboardIcon from '../../assets/images/dashboard-1.svg';
import UserManageIcon from '../../assets/images/dashboard-2.svg';
import InventoryManageIcon from '../../assets/images/dashboard-3.svg';
import RentalManageIcon from '../../assets/images/dashboard-4.svg';
import MessagesIcon from '../../assets/images/dashboard-5.svg';
import EZIcon from '../../assets/images/dashboard-6.svg';
import SettingsIcon from '../../assets/images/dashboard-7.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={MainLogo} alt="logo" />
      </div>
      <nav className="nav">
        <a href="#" className="nav-link active">
          <span className="icon">
            <img src={DashboardIcon} alt="dashboard-icon" />
          </span>
          <span className="txt">Dashboard</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={UserManageIcon} alt="rental-icon" />
          </span>
          <span className="txt">User Management</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={InventoryManageIcon} alt="account-icon" />
          </span>
          <span className="txt">Inventory Management</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={RentalManageIcon} alt="account-icon" />
          </span>
          <span className="txt">Rental Management</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={EZIcon} alt="account-icon" />
          </span>
          <span className="txt">EZ pass billing</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={MessagesIcon} alt="account-icon" />
          </span>
          <span className="txt">Messages</span>
        </a>
        <a href="#" className="nav-link">
          <span className="icon">
            <img src={SettingsIcon} alt="account-icon" />
          </span>
          <span className="txt">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
