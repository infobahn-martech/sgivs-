import React from 'react';
// import { useLocation } from 'react-router-dom';

import CommonHeader from '../../components/common/CommonHeader';
import userCountIcon from '../../assets/images/user-count.svg';
import inventoryCountIcon from '../../assets/images/inventory-count.svg';
import returnedCountIcon from '../../assets/images/returned-count.svg';
import downloadCountIcon from '../../assets/images/download-count.svg';
import deleteIcon from '../../assets/images/delete.svg';
import closeIcon from '../../assets/images/close.svg';

import inventoryMangIcon from '../../assets/images/inventory.svg';
import userMangIcon from '../../assets/images/User_Management.svg';

import useAuthReducer from '../../stores/AuthReducer';
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
  return (
    <>
      {/* <div className="cta-info-blk">
        <div className="board-info">
          <div className="icon-blk">
            <img src={headerInfo?.icon} alt="" />
          </div>
          <span className="txt">{headerInfo?.title}</span>
        </div>
      </div> */}

      <div className="content-wrp-outer">
        <div className="dash-top">
          <div className="panel-wrp">
            <div className="greetings-blk">
              <div className="greetings-title">Hi {profileData?.name} 👋</div>
              <div className="greetings-txt">
                Today is a new day. It's your day. You shape it. Sign in to
                <br /> start managing your projects.
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
          <div className="table-wrp">
            <div className="top-blk">
              <div className="left-wrap">
                <div className="icon-title">
                  <img src={inventoryMangIcon} alt="" className="img" />
                  <span>Inventory management</span>
                </div>
              </div>
              <button className="btn btn-view">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th className="th-name">First name</th>
                    <th className="th-last-anme">Last name</th>
                    <th className="th-email">Email</th>
                    <th className="th-phone">Phone</th>
                    <th className="th-date">
                      <div className="sort-wrap"> Joined date</div>
                    </th>
                    <th className="th-card">Credit card available</th>
                    <th className="th-action">Action</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Kenneth Allen</td>
                    <td>rodger913@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Daniel Hamilton</td>
                    <td>Daniel_hamilton@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>No</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Kurt Bates</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>katie63@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>David Elson</td>
                    <td>jerry73@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Joshua Jones</td>
                    <td>eddie_lake@gmail.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Rhonda Rhodes</td>
                    <td>patricia651@outlook.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="table-wrp">
            <div className="top-blk">
              <div className="left-wrap">
                <div className="icon-title">
                  <img src={userMangIcon} alt="" className="img" />
                  <span>User management</span>
                </div>
              </div>
              <button className="btn btn-view">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th className="th-name">First name</th>
                    <th className="th-last-anme">Last name</th>
                    <th className="th-email">Email</th>
                    <th className="th-phone">Phone</th>
                    <th className="th-date">
                      <div className="sort-wrap"> Joined date</div>
                    </th>
                    <th className="th-card">Credit card available</th>
                    <th className="th-action">Action</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Kenneth Allen</td>
                    <td>rodger913@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Daniel Hamilton</td>
                    <td>Daniel_hamilton@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>No</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Kurt Bates</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>katie63@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>David Elson</td>
                    <td>jerry73@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Joshua Jones</td>
                    <td>eddie_lake@gmail.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Rhonda Rhodes</td>
                    <td>patricia651@outlook.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-pic">
                        <figure className="alphabet">
                          <span className="txt">CH</span>
                        </figure>
                        <span>Kimberly </span>
                      </div>
                    </td>
                    <td>Stephanie Nicol</td>
                    <td>k.p.allen@aol.com</td>
                    <td>(602) 309-9604</td>
                    <td>Mar 3, 2025 </td>
                    <td>Yes</td>
                    <td>
                      <div className="action-wrap">
                        <img src={deleteIcon} alt="" />
                        <img src={closeIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
