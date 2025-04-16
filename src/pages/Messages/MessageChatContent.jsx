import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';

import MessageFooter from './MessageFooter';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import CommonSkeleton from '../../components/common/CommonSkeleton';
import messagesReducer from '../../stores/MessagesReducer';
import { Spinner } from 'react-bootstrap';

const MessageChatContent = ({
  selectedContact,
  message,
  setMessage,
  onSend,
  colorMap,
  isLoadingContact,
  newMessage,
}) => {
  const {
    isLoadingPostMessage,
    GetMessageById,
    messageIdData,
    loadingMessageById,
  } = messagesReducer((state) => state);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [localMessages, setLocalMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedContact?.messages?.length > 0) {
      const sortedInitial = [...selectedContact.messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setLocalMessages(sortedInitial);
      setPage(1);
      setHasMore(true);
    } else {
      setLocalMessages([]);
    }
  }, [selectedContact?.id]);

  // Watch for newly sent message from parent
  useEffect(() => {
    if (!newMessage || !newMessage.id) return;

    setLocalMessages((prev) => {
      const exists = prev.some((msg) => msg.id === newMessage.id);
      if (exists) return prev;
      return [...prev, newMessage];
    });
  }, [newMessage]);

  // Merge fetched older messages
  useEffect(() => {
    if (Array.isArray(messageIdData) && messageIdData.length > 0) {
      const merged = [...localMessages];
      messageIdData.forEach((msg) => {
        const exists = merged?.some((m) => m.id === msg.id);
        if (!exists) merged.unshift(msg);
      });

      merged.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setLocalMessages(merged);
    }
  }, [messageIdData]);

  const fetchMoreMessages = async () => {
    const firstMessage = localMessages?.[0];
    if (!selectedContact?.id || !firstMessage?.id) return;

    const response = await GetMessageById(selectedContact.id, {
      page: page + 1,
      limit: 10,
      beforeMessageId: firstMessage.id,
    });

    if (!Array.isArray(response)) return;
    if (response.length < 10) setHasMore(false);

    setLocalMessages((prev) => [...response, ...prev]);
    setPage((prev) => prev + 1);
  };

  // scroll
  useEffect(() => {
    if (!newMessage || !newMessage.id) return;

    setLocalMessages((prev) => {
      const exists = prev.some((msg) => msg.id === newMessage.id);
      if (exists) return prev;
      return [...prev, newMessage];
    });

    //  Scroll to bottom after message is added
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  }, [newMessage]);

  const renderAvatar = () => {
    if (!selectedContact?.img) {
      return (
        <InitialsAvatar
          name={selectedContact?.name || 'User'}
          uniqueKey={selectedContact?.id}
          colorClass={colorMap?.[selectedContact?.id]}
        />
      );
    }
    return <img src={selectedContact?.img} alt={selectedContact?.name} />;
  };

  const scrollStyle =
    localMessages?.length > 8
      ? {
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }
      : {};

  return (
    <div className="message-content-wrap">
      {/* Header */}
      {isLoadingContact ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner
            // size="sm"
            as="span"
            animation="border"
            variant="info"
            aria-hidden="true"
            className="custom-spinner"
          />
        </div>
      ) : selectedContact?.name && selectedContact?.name !== 'Unknown' ? (
        <div className="head-wrap">
          <figure className="img">
            <InitialsAvatar
              name={selectedContact?.name}
              uniqueKey={selectedContact?.id}
              colorClass={colorMap?.[selectedContact?.id]}
            />
          </figure>
          <div className="name-status-wrap">
            <div className="name">{selectedContact?.name}</div>
            <div className="status online">Online</div>
          </div>
        </div>
      ) : null}

      {/* Chat Messages */}
      <div
        id="scrollableDivMessage"
        ref={scrollRef}
        className="body-msg-wrap"
        style={scrollStyle}
      >
        {isLoadingContact ? (
          <CommonSkeleton />
        ) : selectedContact ? (
          localMessages?.length > 0 ? (
            <InfiniteScroll
              dataLength={localMessages?.length}
              next={fetchMoreMessages}
              hasMore={hasMore}
              inverse={true}
              loader={
                loadingMessageById && (
                  <div className="d-flex justify-content-center py-3">
                    <Spinner
                      as="span"
                      animation="border"
                      variant="info"
                      className="custom-spinner"
                    />
                  </div>
                )
              }
              scrollableTarget="scrollableDivMessage"
            >
              {localMessages?.map((msg, idx) => {
                const msgDate = new Date(msg.createdAt);
                const showDate =
                  idx === 0 ||
                  !isSameDay(
                    new Date(localMessages[idx - 1]?.createdAt),
                    msgDate
                  );

                return (
                  <React.Fragment key={msg.id || idx}>
                    {showDate && (
                      <div className="date-wrap">
                        <span>
                          {isToday(msgDate)
                            ? 'Today'
                            : isYesterday(msgDate)
                            ? 'Yesterday'
                            : format(msgDate, 'eeee, MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                    <div
                      className={`chat-block ${
                        msg.senderType === 1 ? 'chat-block-right' : ''
                      }`}
                    >
                      {msg.senderType !== 1 && renderAvatar()}
                      <div className="chat-content-wrap">
                        <p className="txt">{msg.message}</p>
                        <div className="time">{format(msgDate, 'hh:mm a')}</div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </InfiniteScroll>
          ) : (
            <div className="no-messages text-center mt-5">No messages yet.</div>
          )
        ) : (
          <div className="no-messages text-center mt-5">
            No messages yet. Pick a user to start chatting!
          </div>
        )}
      </div>

      {/* Footer */}
      {selectedContact?.name && selectedContact?.name !== 'Unknown' && (
        <MessageFooter
          message={message}
          setMessage={setMessage}
          onSend={onSend}
          isLoadingPostMessage={isLoadingPostMessage}
        />
      )}
    </div>
  );
};

export default MessageChatContent;
