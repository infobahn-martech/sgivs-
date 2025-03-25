import React from 'react';
import { Outlet } from 'react-router-dom';

import '../../assets/scss/dashboard.scss';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="dashboard-outer">
      <Sidebar />
      <div className="right-pannel">
        <Header />
        <div style={{ height: '100%' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
