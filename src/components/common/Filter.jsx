import React, { useState, useEffect } from 'react';
import calIcon from '../../assets/images/calend-icon.svg';
// import CustomSelect from './CustomSelect';
import CustomDateRange from './DateRangePicker';
import moment from 'moment';
import CommonSelect from './CommonSelect';

const Filter = ({
  filterOptions,
  clearOptions,
  submitFilter,
  show,
  onCancel,
  savedFilters = {},
  isFilterApplied,
}) => {
  const getInitialFilters = () => {
    if (Object.keys(savedFilters).length) return savedFilters;

    return filterOptions?.reduce((acc, option) => {
      if (option.defaultValue) {
        acc[option.BE_keyName] = option.defaultValue.value;
      }
      return acc;
    }, {});
  };

  const [filters, setFilters] = useState(getInitialFilters());

  useEffect(() => {
    if (show) {
      setFilters(getInitialFilters());
    }
  }, [show]);

  // useEffect(() => {
  //   onChange(filters);
  // }, [filters]);

  const handleInputChange = (fieldName, value, isDate = false) => {
    if (isDate) {
      value = moment(value).format('YYYY-MM-DD');
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  // const handleFilterChange = (fieldName, value) => {
  //   setFilters((prev) => ({ ...prev, [fieldName]: value }));
  // };

  const handleFilterChange = (fieldName, value, fieldType) => {
    let updatedValue = value;

    if (fieldType === 'radio') {
      updatedValue = value === 'Yes'; // Convert "Yes" to true and "No" to false
    }

    setFilters((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const clearFilters = () => {
    const cleared = {};

    filterOptions.forEach((option) => {
      if (option && option.BE_keyName) {
        cleared[option.BE_keyName] = '';
      }
    });

    cleared.startDate = null;
    cleared.endDate = null;

    setFilters(cleared);
    clearOptions();
  };
  const cancelFilter = () => {
    onCancel();
    console.log('isFilterApplied', isFilterApplied);
    isFilterApplied && clearFilters();

    // savedFilters && clearFilters();
  };

  // const clearFilters = () => {
  //   setFilters(initialFilters);
  //   clearOptions();
  // };

  return (
    <div
      className={`dropdown-menu dropdown-menu-end filter-dropdown  ${
        show ? 'show' : ''
      } `}
    >
      <div className="drop-title">Filter By</div>
      <div className="drp-cont">
        {filterOptions
          ?.filter((option) => option && option.BE_keyName && option.fieldType)
          ?.map((option) => (
            <div className="row" key={option.BE_keyName}>
              <label className="col-sm-3 col-form-label">
                {option.fieldName}:
              </label>
              <div className="col-sm-9">
                {option.fieldType === 'search' && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={option.placeholder}
                    key={option.BE_keyName + (filters[option.BE_keyName] || '')}
                    value={filters[option.BE_keyName] || ''}
                    onChange={(e) =>
                      handleInputChange(option.BE_keyName, e.target.value)
                    }
                  />
                )}
                {option.fieldType === 'select' && (
                  <CommonSelect
                    className="form-select form-control"
                    key={option.BE_keyName + (filters[option.BE_keyName] || '')}
                    options={option.Options}
                    value={filters[option?.BE_keyName] || ''}
                    onChange={({ value }) => {
                      handleFilterChange(option.BE_keyName, value);
                    }}
                  />
                )}
                {option.fieldType === 'radio' && (
                  <div className="radio-wrps row">
                    <div className="col-sm-9 d-flex align-items-center">
                      {option.Options?.map((val) => (
                        <div className="form-check form-check-inline" key={val}>
                          <input
                            key={
                              option.BE_keyName +
                              (filters[option.BE_keyName] || '')
                            }
                            className="form-check-input"
                            type="radio"
                            name={option.BE_keyName} // Ensure each radio group is unique
                            id={val}
                            value={val}
                            checked={
                              filters[option.BE_keyName] === (val === 'Yes')
                            }
                            onChange={() =>
                              handleFilterChange(
                                option.BE_keyName,
                                val,
                                'radio'
                              )
                            }
                          />
                          <label className="form-check-label" htmlFor={val}>
                            {val}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        {filterOptions.some((opt) => opt.showDateRange) && (
          <div className="row">
            <label className="col-sm-3 col-form-label">Created Date:</label>
            <div className="col-sm-9 field-mask">
              <CustomDateRange
                key={filters.startDate + '_' + filters.endDate}
                className="form-control w-100"
                value={[
                  filters.startDate ? new Date(filters.startDate) : null,
                  filters.endDate ? new Date(filters.endDate) : null,
                ]}
                onChange={({ startDate, endDate }) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate,
                    endDate,
                  }))
                }
              />

              <span className="calendar-icon">
                <img src={calIcon} alt="calendar icon" />
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="filter-ftr">
        <button className="btn clr" onClick={clearFilters}>
          Clear All Filters
        </button>
        <div className="grp-btn">
          <button className="btn btn-Cancel" onClick={cancelFilter}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => submitFilter(filters)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
