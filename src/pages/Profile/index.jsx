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
import useAuthReducer from '../../stores/AuthReducer';
import CustomActionModal from '../../components/common/CustomActionModal';

const Profile = () => {
  const [tab, setTab] = useState({
    profile: true,
    changePassword: false,
    logout: false,
  });
  const [isLogOut, setIsLogOut] = useState(false);
  const { profileData, doLogout } = useAuthReducer((state) => state);

  return (
    <div className='inner-scroll-outer profile'>
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
            <div className="u-name">
              {' '}
              {profileData?.employee?.firstName}{' '}
              {profileData?.employee?.lastName}
            </div>
          </div>

          <div className="profile-tab">
            <div className="profile-tab-inner">
              <ul className="nav nav-tabs" id="profileTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${tab?.profile ? 'active' : ''}`}
                    type="button"
                    onClick={() =>
                      setTab({
                        profile: true,
                        changePassword: false,
                        logout: false,
                      })
                    }
                  >
                    <span>
                      <img src={proPic} alt="profile-icon" />
                    </span>
                    Profile
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tab?.changePassword ? 'active' : ''
                    }`}
                    type="button"
                    onClick={() =>
                      setTab({
                        profile: false,
                        changePassword: true,
                        logout: false,
                      })
                    }
                  >
                    <span>
                      <img src={lock} alt="lock" />
                    </span>
                    Change Password
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className={`nav-link ${tab?.logout ? 'active' : ''}`}
                    onClick={() => {
                      setIsLogOut(true);
                      setTab({
                        profile: false,
                        changePassword: false,
                        logout: true,
                      });
                    }}
                  >
                    <span>
                      <img src={logOut} alt="logout-icon" />
                    </span>
                    Logout
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade active show">
                  <div className="profile-card">
                    {tab?.profile ? (
                      <MyAccount />
                    ) : tab?.changePassword ? (
                      <ChangePassword />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogOut && (
        <CustomActionModal
          isLogout
          showModal={isLogOut}
          closeModal={() => {
            setIsLogOut(false);
            setTab({
              profile: true,
              changePassword: false,
              logout: false,
            });
          }}
          message="Do you want to Logout?"
          onSubmit={() => doLogout()}
        />
      )}
    </div>
  );
};

export default Profile;
