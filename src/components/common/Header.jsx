import React, { useState } from 'react';

import '../../assets/scss/header.scss';
import '../../assets/scss/common.scss';
import '../../assets/scss/profile.scss';
import '../../assets/scss/sidebar.scss';
import '../../assets/scss/dashboard.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/header.scss';

import NotificationIcon from '../../assets/images/notifications.svg';
// import UserIcon from '../../assets/images/avatar.png';
import useAuthReducer from '../../stores/AuthReducer';
import { useNavigate } from 'react-router-dom';
import CustomActionModal from './CustomActionModal';
import InitialsAvatar from './InitialsAvatar';
import { getFirstLetters } from '../../config/config';

const Header = () => {
  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState(false);
  const { doLogout } = useAuthReducer((state) => state);
  const { profileData } = useAuthReducer((state) => state);

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div className="user-details">
            <div className="notification">
              <span className="notification-icon">
                <img src={NotificationIcon} alt="notification" />
              </span>
              <span className="no-of-notification">0</span>
            </div>
            <div className="dropdown user-drop">
              <a
                className="dropdown-toggle user-name"
                href="#"
                role="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                <div className="usr-dtl">
                  <div className="user-image">
                    {profileData?.user?.imageThumb ? (
                      <img src={profileData?.user?.imageThumb} alt="user" />
                    ) : (
                      <div class="user-image alphabet">
                        <span>{getFirstLetters(profileData?.name)} </span>
                      </div>
                    )}
                  </div>
                  <div className="usr-info">
                    <span className="name">{profileData?.name}</span>
                    <span className="role">Administrator</span>
                  </div>
                </div>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/settings');
                    }}
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsLogOut(true)}
                  >
                    Logout
                  </button>
                </li>
              </ul>
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
          }}
          message="Do you want to Logout?"
          onSubmit={() => doLogout()}
        />
      )}
    </>
  );
};

export default Header;
