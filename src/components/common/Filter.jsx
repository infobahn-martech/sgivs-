import React, { useState } from 'react';

import calIcon from '../../assets/images/calend-icon.svg';
import CustomSelect from './CustomSelect';
import CustomDateRange from './DateRangePicker';
import moment from 'moment';

const Filter = ({ filterOptions, onChange, clearOptions }) => {
  const initialFilters = filterOptions.reduce((acc, option) => {
    if (option.defaultValue) {
      acc[option.BE_keyName] = option.defaultValue.value;
    }
    return acc;
  }, {});

  const [filters, setFilters] = useState(initialFilters);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const handleInputChange = (fieldName, value, isDate = false) => {
    if (fieldName === 'u_team_or_department.de_name') {
      setFilters({ ...filters, role: '', level: '' });
    }

    if (isDate) {
      value = moment(value).format('YYYY-MM-DD');
    }
    // if (Array.isArray(value)) {
    //   value = JSON.stringify(value);
    // }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  };
  return (
    <div className="dropdown-menu dropdown-menu-end filter-dropdown ">
      <div className="drop-title">Filter By</div>
      <div className="drp-cont">
        <div className="row">
          <label for="staticEmail" className="col-sm-3 col-form-label">
            Created date :{' '}
          </label>
          <div className="col-sm-9 field-mask">
            <CustomDateRange
              className="form-control w-100"
              onChange={({ startDate, endDate }) =>
                setFilters({ ...filters, startDate, endDate })
              }
            />
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
