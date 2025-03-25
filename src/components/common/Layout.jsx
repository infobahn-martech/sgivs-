import React from 'react';

import '../../assets/css/header.css';
import '../../assets/css/sidebar.css';

import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="dashboard-outer">
      <Sidebar />
      <div className="right-pannel">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
