import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import '../../assets/scss/dashboard.scss';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-outer">
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <div className={`right-pannel ${collapsed ? 'expanded' : ''}`}>
        <Header />
        <div >
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
