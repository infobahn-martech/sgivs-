import React from 'react';
import MessageFooter from './MessageFooter';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';

const MessageChatContent = ({
  selectedContact,
  messages,
  message,
  setMessage,
  onSend,
}) => {
  return (
    <div className="message-content-wrap">
      <div className="head-wrap">
        <figure className="img">
          <img src={selectedContact?.img} alt="" />
        </figure>
        <div className="name-status-wrap">
          <div className="name">{selectedContact.name}</div>
          <div className="status online">Online</div>
        </div>
      </div>

      <div className="body-msg-wrap">
        {messages?.length > 0 &&
          messages?.map((msg, idx) => {
            const msgDate = new Date(msg.time);
            const showDate =
              idx === 0 ||
              !isSameDay(new Date(messages[idx - 1]?.time), msgDate);

            return (
              <React.Fragment key={idx}>
                {showDate && (
                  <div className="date-separator">
                    {isToday(msgDate)
                      ? 'Today'
                      : isYesterday(msgDate)
                      ? 'Yesterday'
                      : format(msgDate, 'eeee, MMM d, yyyy')}
                  </div>
                )}

                <div
                  className={`chat-block ${
                    msg.from === 'me' ? 'chat-block-right' : ''
                  }`}
                >
                  {msg.from === 'them' && (
                    <figure className="img">
                      <img src={selectedContact?.img} alt="" />
                    </figure>
                  )}
                  <div className="chat-content-wrap">
                    <p className="txt">{msg?.text}</p>
                    <div className="time">
                      {format(msgDate, 'hh:mm a')} {/* e.g., 09:35 AM */}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
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
