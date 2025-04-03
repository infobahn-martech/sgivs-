import React, { useEffect, useState } from 'react';
import { durationOption, isValid } from './utils';
import Button from '../../components/common/Button';
import CustomSelet from '../../components/common/CustomSelect';
import alertIcon from '../../assets/images/alert.svg';
import '../../assets/scss/settings.scss';
import useSettingsReducer from '../../stores/SettingsReducer';

const Settings = () => {
  const { postData, isLoading, userData, getData } = useSettingsReducer(
    (state) => state
  );

  console.log('userData', userData);

  const [form, setForm] = useState({
    itemReturnDeadline: '',
    itemReturnDeadlineUnit: '',
    thuFriDeadline: '',
    thuFriDeadlineUnit: '',
    isNotificationOn: true,
    transactionFee: '',
  });
  const [err, setErr] = useState({});

  // Fetch userData when component mounts
  useEffect(() => {
    getData();
  }, []);

  // Populate form when userData is available
  useEffect(() => {
    if (userData?.data) {
      setForm({
        itemReturnDeadline:
          userData.data.isItemHours === true
            ? userData.data.itemDeadlineHours
            : userData.data.itemDeadlineDays,
        itemReturnDeadlineUnit:
          userData.data.isItemHours === true ? 'Hours' : 'Days',
        thuFriDeadline:
          userData.data.isSpecialHours === true
            ? userData.data.specialDeadlineHours
            : userData.data.specialDeadlineDays,
        thuFriDeadlineUnit:
          userData.data.isSpecialHours === true ? 'Hours' : 'Days',
        isNotificationOn: userData.data.isNotificationOn,
        transactionFee: userData?.data?.transactionFee,
      });
    }
  }, [userData]);

  console.log('form', form);

  const handleChange = (val, name) => {
    if (
      ['itemReturnDeadline', 'thuFriDeadline', 'transactionFee'].includes(name)
    ) {
      if (!/^\d*\.?\d*$/.test(val)) return; // Allows decimals
    }

    setErr((prev) => ({ ...prev, [name]: '' }));
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    const errField = isValid(form);
    setErr(errField);

    if (!Object.entries(errField)?.length) {
      postData(form);
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
                        value={form.itemReturnDeadline}
                        onChange={(e) =>
                          handleChange(e.target.value, 'itemReturnDeadline')
                        }
                      />
                      <CustomSelet
                        className="select"
                        options={durationOption}
                        value={form.itemReturnDeadlineUnit}
                        onChange={(e) =>
                          handleChange(e.target.value, 'itemReturnDeadlineUnit')
                        }
                      />
                    </div>
                    {errorText(
                      err?.itemReturnDeadline ?? err?.itemReturnDeadlineUnit
                    )}
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
                        value={form.thuFriDeadline}
                        onChange={(e) =>
                          handleChange(e.target.value, 'thuFriDeadline')
                        }
                      />
                      <CustomSelet
                        className="select"
                        options={durationOption}
                        value={form.thuFriDeadlineUnit}
                        onChange={(e) =>
                          handleChange(e.target.value, 'thuFriDeadlineUnit')
                        }
                      />
                    </div>
                    {errorText(err?.thuFriDeadline ?? err?.thuFriDeadlineUnit)}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="">
                      EZ Pass Transaction Fee
                    </label>
                    <div className="hour-days-wrap">
                      <input
                        type="text"
                        className="form-control"
                        value={form.transactionFee}
                        onChange={(e) =>
                          handleChange(e.target.value, 'transactionFee')
                        }
                      />
                    </div>
                    {errorText(err?.transactionFee ?? err?.transactionFee)}
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
                        checked={form.isNotificationOn}
                        onChange={() =>
                          handleChange(
                            !form.isNotificationOn,
                            'isNotificationOn'
                          )
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
              <button
                className="btn clear"
                onClick={() => {
                  setForm({
                    itemReturnDeadline: '',
                    itemReturnDeadlineUnit: '',
                    thuFriDeadline: '',
                    thuFriDeadlineUnit: '',
                    isNotificationOn: true,
                  });
                  setErr({});
                }}
              >
                Clear
              </button>
              <Button
                isLoading={isLoading}
                onClick={() => handleSubmit()}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
