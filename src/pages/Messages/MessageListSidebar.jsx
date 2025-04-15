import React, { useEffect, useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import AddNewMessageModal from './AddNewMessageModal';
import CommonHeader from '../../components/common/CommonHeader';
import CommonSkeleton from '../../components/common/CommonSkeleton';
import CustomActionModal from '../../components/common/CustomActionModal';
import ContactItem from './ContactItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import messagesReducer from '../../stores/MessagesReducer';

const MessageListSidebar = ({
  selectedId,
  onSelectContact,
  isLoadingContact,
  colorMap,
  allUsers,
  allContacts,
  setAllContacts,
}) => {
  const [addNewMessageModal, setAddNewMessageModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState(null);

  const {
    getSelectedUsers,
    selectedUsers,
    isLoadingDelete,
    deleteUser,
    usersTotalCount = 0,
  } = messagesReducer((state) => state);

  const [params, setParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    hasMore: true,
  });

  useEffect(() => {
    fetchUsers(1);
  }, [params.search]);

  useEffect(() => {
    if (!selectedUsers) return;

    setAllContacts((prev) => {
      return params.page === 1 ? selectedUsers : [...prev, ...selectedUsers];
    });
  }, [selectedUsers]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      hasMore: allContacts?.length < usersTotalCount,
    }));
  }, [allContacts, usersTotalCount]);

  const fetchUsers = (pageToFetch = 1) => {
    getSelectedUsers({
      search: params.search,
      page: pageToFetch,
      limit: params.limit,
    });

    setParams((prev) => ({
      ...prev,
      page: pageToFetch,
    }));
  };

  const loadMoreContacts = () => {
    if (!params.hasMore || isLoadingContact) return;
    fetchUsers(params.page + 1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setAllContacts([]);
    setParams({
      search: value,
      page: 1,
      limit: 10,
      hasMore: true,
    });
  };

  const handleDelete = (contact) => {
    setDeleteModal(true);
    setDeleteDetails(contact);
  };

  const handleDeleteUser = () => {
    if (deleteDetails?.id) {
      deleteUser({ id: deleteDetails.id }, () => {
        setDeleteModal(false);
        setDeleteDetails(null);
        fetchUsers(1);
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

        <div
          className="msg-listing-wrap"
          id="scrollableDiv"
          // style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}
        >
          <div className="search">
            <input
              type="text"
              className="txt"
              placeholder="Search messages"
              value={params.search}
              onChange={handleSearchChange}
            />
          </div>

          {isLoadingContact && params.page === 1 ? (
            Array.from({ length: 7 }).map((_, idx) => (
              <CommonSkeleton key={idx} height={50} />
            ))
          ) : allContacts?.length === 0 ? (
            <li className="no-results">No users found.</li>
          ) : (
            <InfiniteScroll
              dataLength={allContacts.length}
              next={loadMoreContacts}
              hasMore={params.hasMore}
              loader={Array.from({ length: 7 }).map((_, idx) => (
                <CommonSkeleton key={idx} height={50} />
              ))}
              scrollableTarget="scrollableDiv"
            >
              <ul className="listing">
                {allContacts?.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    selectedId={selectedId}
                    onSelectContact={onSelectContact}
                    colorMap={colorMap}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>
            </InfiniteScroll>
          )}
        </div>
      </div>

      <AddNewMessageModal
        showModal={addNewMessageModal}
        closeModal={() => setAddNewMessageModal(false)}
        contacts={allUsers}
        selectedUsers={allContacts}
        onAdded={() => fetchUsers(1)}
        colorMap={colorMap}
      />

      {deleteModal && (
        <CustomActionModal
          isDelete
          isLoading={isLoadingDelete}
          showModal={deleteModal}
          closeModal={() => setDeleteModal(false)}
          message={`Are you sure you want to delete the conversation with ${deleteDetails?.name}?`}
          onCancel={() => setDeleteModal(false)}
          onSubmit={handleDeleteUser}
        />
      )}
    </>
  );
};

export default MessageListSidebar;
