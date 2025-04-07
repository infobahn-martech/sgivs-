import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

import CommonHeader from '../../components/common/CommonHeader';
import userCountIcon from '../../assets/images/user-count.svg';
import inventoryCountIcon from '../../assets/images/inventory-count.svg';
import returnedCountIcon from '../../assets/images/returned-count.svg';
import downloadCountIcon from '../../assets/images/download-count.svg';
// import closeIcon from '../../assets/images/close.svg';

import inventoryMangIcon from '../../assets/images/inventory-dash.svg';
import userMangIcon from '../../assets/images/User_Management.svg';
import useAuthReducer from '../../stores/AuthReducer';
import DashboardSectionTable from './DashboardTable';
import getUserTableColumns from '../userManagement/getUserTableColumns';
import { useNavigate } from 'react-router-dom';
// import { headerConfig } from '../../config/config';

const Dashboard = () => {
  const { profileData } = useAuthReducer((state) => state);
  // const location = useLocation();

  // const currentPath = location.pathname;
  // const headerInfo = headerConfig?.find(
  //   (item) =>
  //     currentPath === item.path ||
  //     (currentPath !== '/' &&
  //       currentPath?.startsWith(item.path) &&
  //       item.path !== '/')
  // ) ||
  //   headerConfig.find((item) => currentPath?.startsWith(item.path)) || {
  //     title: 'Page Not Found',
  //     icon: 'img/default.svg',
  //   };
  const { getAllUsers, usersData } = useAuthReducer((state) => state);
  const usersColumns = getUserTableColumns({
    isDashboard: true,
    showActions: false,
  });

  useEffect(() => {
    // api for userManagement
    getAllUsers({
      search: '',
      page: 1,
      limit: 10,
      fromDate: null,
      toDate: null,
      sortBy: 'firstName',
      sortOrder: 'ASC',
    });
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <div className="content-wrp-outer">
        <div className="dash-top">
          <div className="panel-wrp">
            <div className="greetings-blk">
              <div className="greetings-title">Hi {profileData?.name} 👋</div>
              <div className="greetings-txt">
                Today is a new day. It's your day. You shape it.
                <br /> Sign in to start managing your projects.
              </div>
            </div>
          </div>
          <div className="count-blks-wrp">
            <div className="count-blk user">
              <div className="icon-blk">
                <img src={userCountIcon} alt="" />
              </div>
              <div className="dtl-blk">
                <div className="info">Users count</div>
                <span className="count">320</span>
              </div>
            </div>
            <div className="count-blk inventory">
              <div className="icon-blk">
                <img src={inventoryCountIcon} alt="" />
              </div>
              <div className="dtl-blk">
                <div className="info">Inventory item count</div>
                <span className="count">600</span>
              </div>
            </div>
            <div className="count-blk returned">
              <div className="icon-blk">
                <img src={returnedCountIcon} alt="" />
              </div>
              <div className="dtl-blk">
                <div className="info">Returned items</div>
                <span className="count">200</span>
              </div>
            </div>
            <div className="count-blk borrowed">
              <div className="icon-blk">
                <img src={downloadCountIcon} alt="" />
              </div>
              <div className="dtl-blk">
                <div className="info">Currently Borrowed items</div>
                <span className="count">502</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-table-wrp">
          {/* user Management  */}
          <DashboardSectionTable
            title="User Management"
            icon={userMangIcon}
            columns={usersColumns}
            data={usersData?.data || []}
            onViewAll={() => navigate('/user-management')}
          />

          {/* inventory managmnt  */}
          <DashboardSectionTable
            title="Inventory Management"
            icon={inventoryMangIcon}
            columns={usersColumns}
            data={usersData?.data || []}
            onViewAll={() => navigate('/inventory-management')}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
