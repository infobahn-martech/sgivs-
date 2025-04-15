import React, { useEffect, useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import AddNewMessageModal from './AddNewMessageModal';
import CommonHeader from '../../components/common/CommonHeader';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import messagesReducer from '../../stores/MessagesReducer';
import CommonSkeleton from '../../components/common/CommonSkeleton';
import { Tooltip } from 'react-tooltip';
import CustomActionModal from '../../components/common/CustomActionModal';
import ContactItem from './ContactItem';

const MessageListSidebar = ({
  contacts,
  allUsers,
  selectedId,
  onSelectContact,
  refreshContacts,
  isLoadingContact,
  colorMap,
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
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  selectedId={selectedId}
                  onSelectContact={onSelectContact}
                  colorMap={colorMap}
                  onDelete={handleDelete}
                />
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
        colorMap={colorMap}
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
