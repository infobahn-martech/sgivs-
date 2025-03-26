import React from 'react'
import alertIcon from '../../assets/images/alert.svg';
import '../../assets/scss/settings.scss'

const Settings = () => {
  return (
    <div className="settings-wrap">
      <div className="head-wrap">
        <img src={alertIcon} alt="alert-icon" className="img" />
        <span>Settings</span>
      </div>
      <div className="settings-content-wrap">
        <form action="">
          <div className="fields-outer-wrap">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label" htmlFor="">
                    Email
                  </label>
                  <div className="hour-days-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hours"
                      defaultValue=""
                    />
                    <select name="" id="" className="select">
                      <option value="">Days</option>
                      <option value="">2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label" htmlFor="">
                    Thu/Fri Deadline
                  </label>
                  <div className="hour-days-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hours"
                      defaultValue=""
                    />
                    <select name="" id="" className="select">
                      <option value="">Days</option>
                      <option value="">2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-group-last">
                  <label className="form-label" htmlFor="">
                    Auto-send missed deadline notifications
                  </label>
                  <div className="form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      On / Off
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="settng-footer-wrap">
            <a href="#" className="btn clear">
              Clear
            </a>
            <a href="#" className="btn submit">
              Submit
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings