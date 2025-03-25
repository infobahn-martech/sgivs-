import React from 'react';

import '../../assets/scss/dashboard.scss';

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
