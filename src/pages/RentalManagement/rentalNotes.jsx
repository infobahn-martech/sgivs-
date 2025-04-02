import React from 'react';
import CustomModal from '../../components/common/CustomModal';
import editIcon from '../../assets/images/edit-modal-btn-icon.svg';

const RentalNote = ({ showModal, closeModal, noteContent }) => {
  const renderHeader = () => (
    <>
      <h5 className="modal-title">Note</h5>
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
      <div className="notes-wrp">
        {noteContent?.note || 'No note available.'}
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer">
      <button className="btn btn-cancel" onClick={closeModal}>
        Cancel
      </button>
      <button className="btn btn-primary">
        <span className="icon">
          <img src={editIcon} alt="Edit" />
        </span>
        Edit Note
      </button>
    </div>
  );

  return (
    <CustomModal
      className="note-modal"
      dialgName="modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={closeModal}
      header={renderHeader()}
      body={renderBody()}
      footer={renderFooter()}
    />
  );
};

export default RentalNote;
