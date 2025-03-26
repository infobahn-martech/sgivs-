import React from 'react';
import CustomModal from './common/CustomModal';
import { Spinner } from 'react-bootstrap';

const CustomActionModal = ({
  showModal,
  closeModal,
  message,
  onCancel,
  onSubmit,
  isLoading,
}) => {
  const renderBody = () => (
    <>
      <div className="modal-body">
        <span className="btm-txt">{message}</span>
      </div>
      <div className="modal-footer bottom-btn-sec">
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-submit" onClick={onSubmit}>
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
            'Submit'
          )}
        </button>
      </div>
    </>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade upload-modal"
      dialgName="modal-dialog modal-dialog-centered"
      show={showModal}
      closeModal={() => closeModal(false)}
      body={renderBody()}
    />
  );
};

export default CustomActionModal;
