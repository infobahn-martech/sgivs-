import React from 'react';
import { useLocation } from 'react-router-dom';

import CommonHeader from '../../components/common/CommonHeader';
import userCountIcon from '../../assets/images/user-count.svg';
import inventoryCountIcon from '../../assets/images/inventory-count.svg';
import returnedCountIcon from '../../assets/images/returned-count.svg';
import downloadCountIcon from '../../assets/images/download-count.svg';
import useAuthReducer from '../../stores/AuthReducer';
import { headerConfig } from '../../config/config';

const Dashboard = () => {
  const { profileData } = useAuthReducer((state) => state);
  const location = useLocation();

  const currentPath = location.pathname;
  const headerInfo = headerConfig?.find(
    (item) =>
      currentPath === item.path ||
      (currentPath !== '/' &&
        currentPath?.startsWith(item.path) &&
        item.path !== '/')
  ) ||
    headerConfig.find((item) => currentPath?.startsWith(item.path)) || {
      title: 'Page Not Found',
      icon: 'img/default.svg',
    };
  return (
    <>
      <div className="cta-info-blk">
        <div className="board-info">
          <div className="icon-blk">
            <img src={headerInfo?.icon} alt="" />
          </div>
          <span className="txt">{headerInfo?.title}</span>
        </div>
      </div>
      <div className="content-wrp-outer">
        <div className="panel-wrp">
          <div className="greetings-blk">
            <div className="greetings-title">Hi {profileData.name} 👋</div>
            <div className="greetings-txt">
              Today is a new day. It's your day. You shape it. Sign in to
              <br /> start managing your projects.
            </div>
          </div>
        </div>
        <div className="count-blks-wrp">
          <div className="count-blk">
            <div className="icon-blk">
              <img src={userCountIcon} alt="" />
            </div>
            <div className="dtl-blk">
              <div className="info">Users count</div>
              <span className="count">320</span>
            </div>
          </div>
          <div className="count-blk">
            <div className="icon-blk">
              <img src={inventoryCountIcon} alt="" />
            </div>
            <div className="dtl-blk">
              <div className="info">Inventory item count</div>
              <span className="count">600</span>
            </div>
          </div>
          <div className="count-blk">
            <div className="icon-blk">
              <img src={returnedCountIcon} alt="" />
            </div>
            <div className="dtl-blk">
              <div className="info">Returned items</div>
              <span className="count">200</span>
            </div>
          </div>
          <div className="count-blk">
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
    </>
  );
};

export default Dashboard;
