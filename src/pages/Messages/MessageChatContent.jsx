import React from 'react';
import MessageFooter from './MessageFooter';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';
import InitialsAvatar from '../../components/common/InitialsAvatar'; // fallback avatar

const MessageChatContent = ({
  selectedContact,
  messages,
  message,
  setMessage,
  onSend,
}) => {
  const renderAvatar = () => {
    // Render fallback avatar using name initials
    if (!selectedContact?.img) {
      return <InitialsAvatar name={selectedContact?.name || 'User'} />;
    }
    return <img src={selectedContact?.img} alt={selectedContact?.name} />;
  };

  return (
    <div className="message-content-wrap">
      {selectedContact?.name && selectedContact?.name !== 'Unknown' && (
        <div className="head-wrap">
          <figure className="img">
            <InitialsAvatar name={selectedContact?.name} />
          </figure>
          <div className="name-status-wrap">
            <div className="name">{selectedContact?.name}</div>
            <div className="status online">Online</div>
          </div>
        </div>
      )}

      <div className="body-msg-wrap">
        {messages?.length > 0 ? (
          messages.map((msg, idx) => {
            const msgDate = new Date(msg.time);
            const showDate =
              idx === 0 ||
              !isSameDay(new Date(messages[idx - 1]?.time), msgDate);

            return (
              <React.Fragment key={idx}>
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
                    msg.from === 'me' ? 'chat-block-right' : ''
                  }`}
                >
                  {msg.from === 'them' && (
                    <figure className="img">{renderAvatar()}</figure>
                  )}
                  <div className="chat-content-wrap">
                    <p className="txt">{msg?.text}</p>
                    <div className="time">{format(msgDate, 'hh:mm a')}</div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className="no-messages text-center mt-5">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>

      <MessageFooter
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  );
};

export default MessageChatContent;
