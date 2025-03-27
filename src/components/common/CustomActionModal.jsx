import React from 'react';
import { Spinner } from 'react-bootstrap';

import CustomModal from './CustomModal';
import deleteIcon from '../../assets/images/delete-modal.svg';
import logoutIcon from '../../assets/images/logout-modal.svg';
import notifyIcon from '../../assets/images/notifications.svg';

const CustomActionModal = ({
  showModal,
  closeModal,
  message,
  onSubmit,
  isLoading,
  isDelete,
  isLogout,
}) => {
  const renderBody = () => (
    <>
      <div className="modal-body">
        <div class="modal-icon">
          <div class="icon-blk">
            <img
              // src={notifyIcon}
              src={isDelete ? deleteIcon : isLogout ? logoutIcon : notifyIcon}
              alt=""
            />
          </div>
        </div>
        <div className="prompt-title">{message}</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-cancel" onClick={closeModal}>
          Cancel
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
          ) : (
            isDelete ? 'Delete':'Submit'
          )}
        </button>
      </div>
    </>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade prompt-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={() => closeModal(false)}
      body={renderBody()}
    />
  );
};

export default CustomActionModal;
