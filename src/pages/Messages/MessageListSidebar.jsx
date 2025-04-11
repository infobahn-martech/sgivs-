import React, { useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import AddNewMessageModal from './AddNewMessageModal';
import CommonHeader from '../../components/common/CommonHeader';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import messagesReducer from '../../stores/MessagesReducer';
import CommonSkeleton from '../../components/common/CommonSkeleton';
import deleteIcon from '../../assets/images/delete.svg';
import { Tooltip } from 'react-tooltip';
import CustomActionModal from '../../components/common/CustomActionModal';

const MessageListSidebar = ({
  contacts,
  allUsers,
  selectedId,
  onSelectContact,
  refreshContacts,
  isLoadingContact,
}) => {
  const [addNewMessageModal, setAddNewMessageModal] = useState(false);
  const [search, setSearch] = useState('');
  const { getSelectedUsers, isLoadingDelete, deleteUser } = messagesReducer(
    (state) => state
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    getSelectedUsers({ search: value });
  };

  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteDetails, setdeleteDetails] = useState(null);

  const handleDelete = (contact) => {
    setdeleteModal(true);
    setdeleteDetails(contact);
  };

  const handleDeleUser = () => {
    if (deleteDetails?.id) {
      deleteUser({ id: deleteDetails.id }, () => {
        setdeleteModal(false);
        setdeleteDetails(null);
        refreshContacts();
      });
    }
  };

  return (
    <>
      <div className="message-left-wrap">
        <div className="head">
          <CommonHeader hideFilter hideRightSide />
          <div
            className="icon cursor-pointer"
            onClick={() => setAddNewMessageModal(true)}
          >
            <img src={plusIcon} alt="plus" />
          </div>
        </div>

        <div className="msg-listing-wrap">
          <div className="search">
            <input
              type="text"
              className="txt"
              placeholder="Search messages"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <ul className="listing">
            {isLoadingContact ? (
              // eslint-disable-next-line no-unused-vars
              Array.from({ length: 7 }).map((_, idx) => (
                <>
                  <CommonSkeleton height={50} />
                </>
              ))
            ) : contacts?.length === 0 ? (
              <li className="no-results">No users found.</li>
            ) : (
              contacts?.map((contact) => (
                <li
                  key={contact?.id}
                  className={selectedId === contact?.id ? 'active' : ''}
                  onClick={() => onSelectContact(contact.id)}
                >
                  <InitialsAvatar name={contact?.name} />
                  <div className="name-msg-wrap">
                    <div className="name">{contact?.name}</div>
                    <div className="msg">
                      {contact?.lastMessage || 'No messages yet'}
                    </div>
                  </div>
                  <div className="time">
                    {contact?.lastMessageAt
                      ? new Date(contact?.lastMessageAt)?.toLocaleTimeString()
                      : ''}
                  </div>

                  {selectedId === contact?.id && (
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      data-tooltip-id={`delete-tooltip-${contact?.id}`}
                      data-tooltip-content="Delete"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact);
                      }}
                    />

                    // <div
                    //   data-tooltip-id={`delete-tooltip-${contact?.id}`}
                    //   data-tooltip-content="Delete"
                    //   className="delete-icon"
                    //   onClick={(e) => {
                    //     e.stopPropagation();
                    //     handleDelete(contact?.id);
                    //   }}
                    //   title="Delete chat"
                    // >
                    //   🗑
                    // </div>
                  )}
                  <Tooltip
                    id={`delete-tooltip-${contact?.id}`}
                    place="top"
                    effect="solid"
                    style={{ backgroundColor: '#2ca0da' }}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <AddNewMessageModal
        showModal={addNewMessageModal}
        closeModal={() => setAddNewMessageModal(false)}
        contacts={allUsers}
        selectedUsers={contacts}
        onAdded={refreshContacts}
      />

      {deleteModal && (
        <CustomActionModal
          isDelete
          isLoading={isLoadingDelete}
          showModal={deleteModal}
          closeModal={() => setdeleteModal(false)}
          message={`Are you sure you want to delete the conversation with ${deleteDetails?.name}  ?`}
          onCancel={() => setdeleteModal(false)}
          onSubmit={handleDeleUser}
        />
      )}
    </>
  );
};

export default MessageListSidebar;
