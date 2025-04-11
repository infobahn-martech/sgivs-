import React, { useState } from 'react';
import CustomModal from '../../components/common/CustomModal';

const AddNewMessageModal = ({
  showModal,
  closeModal,
  contacts = [],
  onAdd,
}) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [error, setError] = useState('');

  const toggleSelection = (contactId) => {
    setError(''); // clear error on selection
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleAdd = () => {
    if (selectedContacts.length > 0) {
      onAdd(selectedContacts);
      setSelectedContacts([]);
      setError('');
    } else {
      setError('Please select at least one contact.');
    }
  };

  const renderHeader = () => (
    <h5 className="modal-title" id="uploadModalLabel">
      Add New
    </h5>
  );

  const renderBody = () => (
    <div className="modal-body">
      <ul className="msg-list-wrp">
        {contacts?.map((user) => (
          <li
            className={`msg-list ${
              selectedContacts.includes(user.id) ? 'selected' : ''
            }`}
            key={user.id}
            onClick={() => toggleSelection(user.id)}
            style={{
              cursor: 'pointer',
              backgroundColor: selectedContacts.includes(user.id)
                ? '#e6f7ff'
                : 'transparent',
            }}
          >
            <div className="prof-img">
              <img src={user.img} alt={user.name} />
            </div>
            <div className="prof-dtl">
              <div className="info">
                <div className="name">{user.name}</div>
                {/* <div className="status">{user.status}</div> */}
              </div>
              <div className="time">{user.time}</div>
            </div>
          </li>
        ))}
      </ul>
      {error && <span className="error">{error}</span>}
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer">
      <button className="btn btn-primary" onClick={handleAdd}>
        <span className="icon">Add</span>
      </button>
    </div>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade add-new-msg-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={() => {
        setSelectedContacts([]);
        setError('');
        closeModal();
      }}
      header={renderHeader()}
      body={renderBody()}
      footer={renderFooter()}
    />
  );
};

export default AddNewMessageModal;
