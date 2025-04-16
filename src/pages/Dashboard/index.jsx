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
import { getInventoryColumns } from '../InventoryManagement/getInventoryColumns';
import useInventoryStore from '../../stores/InventoryReducer';
import CountBlock from './CountBlock';
import dashboardReducer from '../../stores/DashboardReducer';

const Dashboard = () => {
  const { profileData } = useAuthReducer((state) => state);

  const { getAllUsers, usersData, isUsersLoading } = useAuthReducer(
    (state) => state
  );
  const { dashData, dashLoading, getDashboard } = dashboardReducer(
    (state) => state
  );

  const {
    getInventoryList,
    inventoryList,

    isListLoading,
  } = useInventoryStore((state) => state);
  const usersColumns = getUserTableColumns({
    isDashboard: true,
    showActions: false,
  });

  const inventoryColumns = getInventoryColumns({
    showAction: false,
  });

  const counters = [
    {
      icon: userCountIcon,
      label: 'Users count',
      count: dashData?.usersCount ?? '-',
      className: 'user',
    },
    {
      icon: inventoryCountIcon,
      label: 'Inventory item count',
      count: dashData?.inventoryItemsCount ?? '-',
      className: 'inventory',
    },
    {
      icon: returnedCountIcon,
      label: 'Returned items',
      count: dashData?.inventoryReturnedItemsCount ?? '-',
      className: 'returned',
    },
    {
      icon: downloadCountIcon,
      label: 'Currently Borrowed items',
      count: dashData?.inventoryBorrowedItemsCount ?? '-',
      className: 'borrowed',
    },
  ];

  useEffect(() => {
    getDashboard();

    // api for userManagement
    getAllUsers({
      search: '',
      page: 1,
      limit: 10,
      fromDate: null,
      toDate: null,
      sortBy: 'createdAt',
      sortOrder: 'ASC',
    });

    getInventoryList({
      search: '',
      page: 1,
      limit: 10,
      fromDate: null,
      toDate: null,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
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
            {counters?.map((item, idx) => (
              <CountBlock
                key={idx}
                icon={item.icon}
                label={item.label}
                count={item.count}
                className={item.className}
                isLoading={dashLoading}
              />
            ))}
          </div>
        </div>
        <div className="dash-table-wrp">
          {/* user Management  */}
          <DashboardSectionTable
            title="User Management"
            icon={userMangIcon}
            columns={usersColumns}
            data={usersData?.data || []}
            isLoading={isUsersLoading}
            onViewAll={() => navigate('/user-management')}
          />

          {/* inventory managmnt  */}
          <DashboardSectionTable
            title="Inventory Management"
            icon={inventoryMangIcon}
            columns={inventoryColumns}
            data={inventoryList || []}
            isLoading={isListLoading}
            onViewAll={() => navigate('/inventory-management')}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
