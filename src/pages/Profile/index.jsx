import React, { useState } from 'react';
import '../../assets/scss/common.scss';
import '../../assets/scss/forms.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/signin.scss';

import proPic from '../../assets/images/pro-pic.svg';
import proPict from '../../assets/images/profile-picture.svg';
import lock from '../../assets/images/lock.svg';
import logOut from '../../assets/images/log-out.svg';
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const [isMyAccount, setIsMyAccount] = useState(true);
  console.log('isMyAccount', isMyAccount);

  return (
    <div className="profile-sec">
      <div className="profile-title">
        <span className="pro-pic">
          <img src={proPic} alt="pro-pic" />
        </span>
        <span>Profile</span>
      </div>
      <div className="profile-inner">
        <div className="profile-picture">
          <div className="img-sec">
            <img src={proPict} alt="profile-picture" />
          </div>
          <div className="u-name">William James</div>
        </div>

        <div className="profile-tab">
          <div className="profile-tab-inner">
            <ul className="nav nav-tabs" id="profileTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${isMyAccount ? 'active' : ''}`}
                  type="button"
                  onClick={() => setIsMyAccount(true)}
                >
                  <span>
                    <img src={proPic} alt="profile-icon" />
                  </span>
                  Profile
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${!isMyAccount ? 'active' : ''}`}
                  type="button"
                  onClick={() => setIsMyAccount(false)}
                >
                  <span>
                    <img src={lock} alt="lock" />
                  </span>
                  Change Password
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  href="#"
                  aria-selected="false"
                  tabIndex="-1"
                  role="tab"
                >
                  <span>
                    <img src={logOut} alt="logout-icon" />
                  </span>
                  Logout
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade active show">
                <div className="profile-card">
                  {isMyAccount ? <MyAccount /> : <ChangePassword />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
