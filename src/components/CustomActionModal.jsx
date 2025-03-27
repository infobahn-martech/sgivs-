import React from 'react';
import CustomModal from './common/CustomModal';
import { Spinner } from 'react-bootstrap';

const CustomActionModal = ({
  showModal,
  closeModal,
  message,
  onSubmit,
  isLoading,
}) => {
  const renderBody = () => (
    <>
      <div className="modal-body">
        <div className="prompt-title">{message}</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
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
      className="modal fade prompt-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={() => closeModal(false)}
      body={renderBody()}
    />
  );
};

export default CustomActionModal;
