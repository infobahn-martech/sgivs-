import React from 'react';
import '../../assets/scss/common.scss';
import '../../assets/scss/forms.scss';
import '../../assets/scss/footer.scss';
import '../../assets/scss/signin.scss';

import proPic from '../../assets/images/pro-pic.svg';
import proPict from '../../assets/images/profile-picture.svg';
import lock from '../../assets/images/lock.svg';
import logOut from '../../assets/images/log-out.svg';

const Profile = () => {
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
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#profile"
                  aria-selected="false"
                  role="tab"
                  tabIndex="-1"
                >
                  <span>
                    <img src={proPic} alt="profile-icon" />
                  </span>
                  Profile
                </a>
              </li>

              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#changePassword"
                  aria-selected="true"
                  role="tab"
                >
                  <span>
                    <img src={lock} alt="lock" />
                  </span>
                  Change Password
                </a>
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
              <div className="tab-pane fade" id="profile" role="tabpanel">
                <div className="profile-card">
                  <div className="box-section">
                    <div className="col-md-6 boxes">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">First name</span>
                          <span className="dark-name">William</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 boxes box2">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">Last name</span>
                          <span className="dark-name">James</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 boxes">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">Email Address</span>
                          <span className="dark-name">
                            williamjames@gmail.com
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 boxes">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">Phone Number</span>
                          <span className="dark-name">+91 99647585 458</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 boxes">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">Joined date</span>
                          <span className="dark-name">23 Jan 2024</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 boxes">
                      <div className="box-inner">
                        <div className="lft-txt">
                          <span className="light">Credit card available</span>
                          <span className="dark-name">Yes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade active show" id="changePassword">
                <div className="profile-card">
                  <form className="change-pass">
                    <div className="mb-3 row input-grp">
                      <div className="col-md-6 input-wrp">
                        <label className="form-label">Old password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="At least 8 characters"
                          minLength={8}
                          required
                        />
                        <span className="error">Please check fields</span>
                      </div>
                    </div>
                    <div className="mb-3 row input-grp">
                      <div className="col-md-6 input-wrp">
                        <label className="form-label">New password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="At least 8 characters"
                          minLength={8}
                          required
                        />
                        <span className="error">Please check fields</span>
                      </div>
                      <div className="col-md-6 input-wrp">
                        <label className="form-label">
                          Re-enter the new password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Re-enter the new password"
                          minLength={8}
                          required
                        />
                        <span className="error">Please check fields</span>
                      </div>
                    </div>
                    <div className="bottom-btn-sec">
                      <button type="reset" className="btn btn-cancel">
                        Clear
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Submit
                      </button>
                    </div>
                  </form>
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
