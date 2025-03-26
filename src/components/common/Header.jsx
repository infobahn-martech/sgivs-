import React from 'react';

import '../../assets/scss/header.scss';
import '../../assets/scss/common.scss';
import '../../assets/scss/profile.scss';
import '../../assets/scss/sidebar.scss';
import '../../assets/scss/dashboard.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/header.scss';

import NotificationIcon from '../../assets/images/notifications.svg';
import UserIcon from '../../assets/images/avatar.png';
import useAuthReducer from '../../stores/AuthReducer';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { doLogout } = useAuthReducer((state) => state);

  return (
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
                  <img src={UserIcon} alt="user" />
                </div>
                <div className="usr-info">
                  <span className="name">William James</span>
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
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Profile
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => doLogout()}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
