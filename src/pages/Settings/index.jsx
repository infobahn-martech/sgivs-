import React, { useState } from 'react';
import { durationOption, isValid } from './utils';
import Button from '../../components/common/Button';
import CustomSelet from '../../components/common/CustomSelect';
import alertIcon from '../../assets/images/alert.svg';
import '../../assets/scss/settings.scss';

const Settings = () => {
  const [form, setForm] = useState({
    deadLine: '',
    deadLineIntrvl: '',
    ezDeadline: '',
    ezDeadlineIntrvl: '',
    notification: true,
  });
  const [err, setErr] = useState({});

  const handleChange = (val, name) => {
    setErr((prev) => ({ ...prev, [name]: '' }));
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    const errField = isValid(form);
    setErr(errField);

    if (!Object.entries(errField)?.length) {
      // API{
      console.log('submit');
    }
  };

  const errorText = (msg) => <span className="text-danger">{msg}</span>;

  return (
    <div class="inner-scroll-outer settings">
      <div className="settings-wrap">
        <div className="head-wrap">
          <img src={alertIcon} alt="alert-icon" className="img" />
          <span>Settings</span>
        </div>
        <div className="settings-content-wrap">
          <div>
            <div className="fields-outer-wrap">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="">
                      Item Return Deadline
                    </label>
                    <div className="hour-days-wrap">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          handleChange(e.target.value, 'deadLine')
                        }
                        placeholder="Hours"
                      />
                      <CustomSelet
                        className="select"
                        options={durationOption}
                        onChange={(e) =>
                          handleChange(e.target.value, 'deadLineIntrvl')
                        }
                      />
                    </div>
                    {errorText(err?.deadLine ?? err?.deadLineIntrvl)}
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
                        onChange={(e) =>
                          handleChange(e.target.value, 'ezDeadline')
                        }
                        placeholder="Hours"
                      />
                      <CustomSelet
                        className="select"
                        options={durationOption}
                        onChange={(e) =>
                          handleChange(e.target.value, 'ezDeadlineIntrvl')
                        }
                      />
                    </div>
                    {errorText(err?.ezDeadline ?? err?.ezDeadlineIntrvl)}
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
                        id="flexSwitchCheckDefault"
                        checked={form.notification}
                        onChange={() =>
                          handleChange(!form.notification, 'notification')
                        }
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
              <button className="btn clear">Clear</button>
              <Button onClick={() => handleSubmit()}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
