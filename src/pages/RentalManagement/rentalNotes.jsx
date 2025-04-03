import React, { useState, useEffect } from 'react';
import CustomModal from '../../components/common/CustomModal';
import editIcon from '../../assets/images/edit-modal-btn-icon.svg';

const RentalNote = ({ showModal, closeModal, noteContent, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState('');
  console.log('noteContent', noteContent);
  // Sync editedNote when noteContent changes
  useEffect(() => {
    if (noteContent?.note) {
      setEditedNote(noteContent.note);
    }
  }, [noteContent]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log('Saving note:', noteContent?.id, editedNote);

    if (!editedNote.trim()) {
      console.warn('Cannot save empty note.');
      return;
    }

    if (noteContent?.id && updateNote) {
      updateNote(noteContent.id, editedNote); // Ensure id and note are passed correctly
      setIsEditing(false);
    } else {
      console.error('Missing note ID or update function.');
    }
  };

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
        {isEditing ? (
          <textarea
            className="form-control"
            value={editedNote}
            onChange={(e) => setEditedNote(e.target.value)}
            rows={4}
          />
        ) : (
          <p>{noteContent?.note || 'No note available.'}</p>
        )}
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer">
      <button className="btn btn-cancel" onClick={closeModal}>
        Cancel
      </button>
      <button
        className="btn btn-primary"
        onClick={isEditing ? handleSaveClick : handleEditClick}
      >
        {isEditing ? (
          'Save'
        ) : (
          <span className="icon">
            <img src={editIcon} alt="Edit" />
          </span>
        )}
        {isEditing ? '' : 'Edit Note'}
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
