import React, { useState, useMemo } from 'react';
import CustomModal from '../../components/common/CustomModal';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import messagesReducer from '../../stores/MessagesReducer';
import { Spinner } from 'react-bootstrap';
import CommonSkeleton from '../../components/common/CommonSkeleton';

const AddNewMessageModal = ({
  showModal,
  closeModal,
  contacts = [],
  selectedUsers = [],
  onAdded,
  colorMap,
}) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [error, setError] = useState('');
  const { addUsers, isLoadingAddUser, isLoadingContact } = messagesReducer(
    (state) => state
  );

  const selectedUserIds = useMemo(
    () => selectedUsers?.map((u) => u?.userId),
    [selectedUsers]
  );

  const filteredContacts = useMemo(
    () => contacts?.filter((user) => !selectedUserIds?.includes(user.id)),
    [contacts, selectedUserIds]
  );

  const toggleSelection = (contactId) => {
    setError('');
    setSelectedContacts((prev) =>
      prev?.includes(contactId)
        ? prev?.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleAdd = () => {
    if (selectedContacts.length > 0) {
      const payload = {
        userId: selectedContacts,
      };

      addUsers(payload, () => {
        onAdded?.();
        setSelectedContacts([]);
        setError('');
        closeModal();
      });
    } else {
      setError('Please select at least one contact.');
    }
  };

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
      header={<h5 className="modal-title">Create Message</h5>}
      body={
        <div className="modal-body">
          {isLoadingContact ? (
            <>
              {Array.from({ length: 10 }).map((_, idx) => (
                <CommonSkeleton key={idx} />
              ))}
            </>
          ) : filteredContacts?.length === 0 ? (
            <div className="no-results">No users found.</div>
          ) : (
            <ul className="msg-list-wrp">
              {filteredContacts?.map((user) => (
                <li
                  className={`msg-list ${
                    selectedContacts?.includes(user?.id) ? 'selected' : ''
                  }`}
                  key={user?.id}
                  onClick={() => toggleSelection(user?.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedContacts.includes(user?.id)
                      ? '#e6f7ff'
                      : 'transparent',
                  }}
                >
                  <div className="prof-img">
                    <InitialsAvatar
                      name={user?.name}
                      uniqueKey={user?.id}
                      colorClass={colorMap?.[user?.id]}
                    />
                  </div>
                  <div className="prof-dtl">
                    <div className="info">
                      <div className="name">{user?.name}</div>
                    </div>
                    <div className="time">{user?.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {error && <span className="error">{error}</span>}
        </div>
      }
      footer={
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={isLoadingAddUser}
          >
            <span className="icon">
              {isLoadingAddUser ? (
                <Spinner
                  size="sm"
                  as="span"
                  animation="border"
                  variant="light"
                  aria-hidden="true"
                  className="custom-spinner"
                />
              ) : (
                'Add'
              )}
            </span>
          </button>
        </div>
      }
    />
  );
};

export default AddNewMessageModal;
