import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CustomModal from '../../components/common/CustomModal';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import useRentalReducer from '../../stores/RentalReducer';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';

const DeadLineModal = ({
  showModal,
  closeModal,
  deadlineId,
  setdeadlineModal,
  handleGetAllRentals,
}) => {
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [deadlineTime, setDeadlineTime] = useState(null);
  const [errors, setErrors] = useState({});
  const { changeStatus: postChangeStatus, statusLoading } = useRentalReducer(
    (state) => state
  );
  // Submit handler with validation
  const handleSubmit = () => {
    const newErrors = {};

    if (!deadlineDate) {
      newErrors.date = 'Please select a deadline date.';
    }

    if (!deadlineTime) {
      newErrors.time = 'Please select a time.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formattedDate = moment(deadlineDate).format('YYYY-MM-DD');
      const formattedTime = moment(deadlineTime, 'hh:mm A').format('HH:mm');

      postChangeStatus({
        id: deadlineId,
        dueDate: formattedDate + ' ' + formattedTime,
        cb: () => {
          closeModal();
          setdeadlineModal(null);
          handleGetAllRentals();
        },
      });
    }
  };

  const handleClear = () => {
    setDeadlineDate(null);
    setDeadlineTime(null);
    setErrors({});
  };

  const renderHeader = () => (
    <>
      <h5 className="modal-title" id="uploadModalLabel">
        Set New Deadline
      </h5>
      <button
        type="button"
        className="btn-close"
        onClick={closeModal}
        aria-label="Close"
      ></button>
    </>
  );

  const renderBody = () => (
    <div className="modal-body">
      <div className="set-dealine-wrp">
        <div className="row">
          {/* Deadline Date Picker */}
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-label">New Deadline</label>
              <DatePicker
                selected={deadlineDate}
                onChange={(date) => {
                  setDeadlineDate(date);
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YY"
                className="form-control"
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </div>
          </div>

          {/* Time Picker */}
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-label">Time</label>
              <TimePicker
                onChange={(time) => {
                  setDeadlineTime(time);
                  setErrors((prev) => ({ ...prev, time: undefined }));
                }}
                value={deadlineTime}
                format="hh:mm a"
                disableClock
                clearIcon={null}
                className="form-control"
              />
              {errors.time && <p className="error">{errors.time}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer bottom-btn-sec">
      <button type="button" className="btn btn-cancel" onClick={handleClear}>
        Clear
      </button>
      <button
        type="button"
        className="btn btn-submit"
        onClick={handleSubmit}
        disabled={statusLoading}
      >
        {statusLoading ? (
          <Spinner
            size="sm"
            as="span"
            animation="border"
            variant="light"
            aria-hidden="true"
            className="custom-spinner"
          />
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );

  return (
    <>
      <CustomModal
        className="modal fade set-deadline-modal"
        dialgName="modal-dialog modal-dialog-centered"
        show={showModal}
        closeModal={closeModal}
        header={renderHeader()}
        body={renderBody()}
        footer={renderFooter()}
      />
    </>
  );
};

export default DeadLineModal;
