import React from 'react';
import { Spinner } from 'react-bootstrap';

import '../../assets/scss/modal.scss'

import CustomModal from './CustomModal';
import deleteIcon from '../../assets/images/delete-modal.svg';
import logoutIcon from '../../assets/images/logout-modal.svg';
import notifyIcon from '../../assets/images/notifications.svg';
import warningIcon from '../../assets/images/warning.svg';

const CustomActionModal = ({
  showModal,
  closeModal,
  message,
  onSubmit,
  isLoading,
  isDelete,
  isLogout,
  isWarning = false,
  button = { primary: 'Submit', secondary: 'Cancel' },
}) => {
  const renderBody = () => (
    <>
      <div className="modal-body">
        <div className="modal-icon">
          <div className="icon-blk">
            <img
              // className="icon"
              // src={notifyIcon}
              src={
                isDelete
                  ? deleteIcon
                  : isLogout
                  ? logoutIcon
                  : isWarning
                  ? warningIcon
                  : notifyIcon
              }
              alt=""
            />
          </div>
        </div>
        <div className="prompt-title">{message}</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-cancel" onClick={closeModal}>
          {button.secondary}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner
              size="sm"
              as="span"
              animation="border"
              variant="light"
              aria-hidden="true"
              className="custom-spinner"
            />
          ) : isDelete ? (
            'Delete'
          ) : (
            button.primary
          )}
        </button>
      </div>
    </>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade prompt-modal add-new-msg-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={() => closeModal(false)}
      body={renderBody()}
    />
  );
};

export default CustomActionModal;
