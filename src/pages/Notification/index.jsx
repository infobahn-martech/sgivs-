import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';

import useNotificationsReducer from '../../stores/NotificationsReducer';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import CustomModal from '../../components/common/CustomModal';

const Notifications = ({ isOpen = true, onClose }) => {
  const {
    getNotifications,
    notifications,
    isLoading,
  } = useNotificationsReducer((state) => state);
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const [notificationList, setNotificationList] = useState([]);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    getNotifications(params);
  }, [getNotifications, params]);

  useEffect(() => {
    if (notifications?.data?.length) {
      setNotificationList((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newNotifications = notifications.data.filter(
          (item) => !existingIds.has(item.id)
        );
        const updatedList = [...prev, ...newNotifications];
        // Sort by createdAt in descending order (newest first)
        return updatedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
      // If less data received than limit, we've reached the end
      if (notifications.data.length < params.limit) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [notifications, params.limit]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  const renderBody = () => (
    <div className="modal-body" id="scrollableDiv">
      <div className={!isLoading ? 'content' : ''}>
        {isLoading ? (
          <div className="d-flex justify-content-center py-3" key="loader">
            <Spinner
              animation="border"
              variant="info"
              className="custom-spinner"
            />
          </div>
        ) : (
          <ul className="notification-list">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMore}
              loader={
                <div
                  className="d-flex justify-content-center py-3"
                  key="loader"
                >
                  <Spinner
                    animation="border"
                    variant="info"
                    className="custom-spinner"
                  />
                </div>
              }
              useWindow={false}
              getScrollParent={() => document.getElementById('scrollableDiv')}
            >
              {notificationList.map((data) => (
                <li className={data.unread ? 'unread' : ''} key={data.id}>
                  <InitialsAvatar
                    name={data.user}
                    className="user-image"
                    hideColor
                  />
                  <div className="profile-cont">
                    <div className="usr-title">{data.user}</div>
                    <div className="usr-desc">{data.activity}</div>
                  </div>
                  <div className="day-info">
                    {moment(data.createdAt).toNow()}
                  </div>
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        )}
      
      </div>
    </div>
  );
  const renderHeader = () => (
    <>
      <h5 className="modal-title" id="uploadModalLabel">
        Notifications
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </>
  );

  return (
    <>
      <CustomModal
        show={isOpen}
        body={renderBody()}
        className="modal fade notify-modal"
        dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        header={renderHeader()}
      />
    </>
  );
};

export default Notifications;
