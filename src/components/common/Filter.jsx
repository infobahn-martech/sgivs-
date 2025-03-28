import React from 'react';

import calIcon from '../../assets/images/calend-icon.svg';
import CustomSelect from './CustomSelect';
import CustomDateRange from './DateRangePicker';

const Filter = () => {
  return (
    <div className="dropdown-menu dropdown-menu-end filter-dropdown ">
      <div className="drop-title">Filter By</div>
      <div className="drp-cont">
        <div className="row">
          <label for="staticEmail" className="col-sm-3 col-form-label">
            Created date :{' '}
          </label>
          <div className="col-sm-9 field-mask">
            <CustomDateRange className="form-control w-100" />
            <span className="calendar-icon">
              <img src={calIcon} alt="" />
            </span>
          </div>
        </div>
        <div className="row">
          <label for="inputPassword" className="col-sm-3 col-form-label">
            Visibility :
          </label>
          <div className="col-sm-9">
            <CustomSelect
              className="form-select form-control"
              options={[
                { value: 'shown', label: 'shown' },
                { value: 'hidden', label: 'hidden' },
              ]}
            />
          </div>
        </div>
        <div className="radio-wrps row">
          <label for="inputPassword" className="col-sm-3 col-form-label">
            Parts found :
          </label>
          <div className="col-sm-9 d-flex align-items-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" for="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" for="inlineRadio2">
                No
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-ftr">
        <button className="btn clr">Clear All Filters</button>
        <div className="grp-btn">
          <button className="btn btn-Cancel">Cancel</button>
          <button className="btn btn-primary">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
