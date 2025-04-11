import React, { useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import AddNewMessageModal from './AddNewMessageModal';
import CommonHeader from '../../components/common/CommonHeader';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import messagesReducer from '../../stores/MessagesReducer';
import CommonSkeleton from '../../components/common/CommonSkeleton';

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
  const { getSelectedUsers } = messagesReducer((state) => state);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    getSelectedUsers({ search: value });
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
    </>
  );
};

export default MessageListSidebar;
