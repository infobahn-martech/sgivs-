import { useRef } from "react";
import PropTypes from "prop-types";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";

function CustomDateRange({ start, end, change }) {
  const label = start?.isSame(end, "days")
    ? start?.format("MMMM D, YYYY")
    : `${start?.format("MMMM D, YYYY")} - ${end?.format("MMMM D, YYYY")}`;

  // const maxDate = moment().isAfter("2023-09-04", "YYYY-MM-DD")
  //   ? moment().format("YYYY-MM-DD")
  //   : "2023-09-04";
  const dateref = useRef();

  return (
    <DateRangePicker
      ref={dateref}
      initialSettings={{
        showDropdowns: true,
        // minDate: "1900-01-01",
        maxDate: moment().toDate(), // Set a maximum date
        startDate: start?.toDate(),
        endDate: end?.toDate(),
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [
            moment().subtract(1, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "Last 7 Days": [
            moment().subtract(6, "days").toDate(),
            moment().toDate(),
          ],
          "Last 30 Days": [
            moment().subtract(29, "days").toDate(),
            moment().toDate(),
          ],
          "This Month": [
            moment().startOf("month").toDate(),
            moment().endOf("month").toDate(),
          ],
          "Last Month": [
            moment().subtract(1, "month").startOf("month").toDate(),
            moment().subtract(1, "month").endOf("month").toDate(),
          ],
          "This Year": [
            moment().startOf("year").toDate(),
            moment().endOf("year").toDate(),
          ],
        },
      }}
      onCallback={change}
    >
      <div
        id="reportrange"
        className="custom-cl-feild"
        // style={{
        //     background: '#fff',
        //     cursor: 'pointer',
        //     padding: '5px 10px',
        //     border: '1px solid #ccc',
        //     width: '100%',
        // }}
      >
        {/* <i className="fa fa-calendar" /> */}
        {/* <img src={calenderBorder} alt="calenderBorder" /> */}
        &nbsp;
        <span className="input-fld">{label}</span>{" "}
        <i className="fa fa-caret-down" />
      </div>
    </DateRangePicker>
  );
}

CustomDateRange.propTypes = {
  start: PropTypes.instanceOf(moment),
  end: PropTypes.instanceOf(moment),
  change: PropTypes.func,
};

export default CustomDateRange;
