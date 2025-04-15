import React from 'react';
import messageIcon from '../../assets/images/message.svg';

const MessageFooter = ({
  message,
  setMessage,
  onSend,
  isLoadingPostMessage,
}) => {
  return (
    <div className="footer-wrap">
      <input
        type="text"
        className="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        disabled={isLoadingPostMessage}
      />
      <img
        src={messageIcon}
        alt=""
        className={`img ${isLoadingPostMessage ? 'disabled' : ''}`}
        onClick={!isLoadingPostMessage ? onSend : undefined}
      />
    </div>
  );
};

export default MessageFooter;
