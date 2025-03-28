import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ className, onChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) onChange({ startDate, endDate });
  }, [dateRange]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(update) => setDateRange(update)}
      startDate={startDate}
      endDate={endDate}
      show
      // showFullMonthYearPicker
      showTwoColumnMonthYearPicker
      showYearDropdown
      showMonthDropdown
      selectsRange
      className={className}
      placeholderText="Select date range"
    />
  );
};

export default DateRangePicker;
