import React from 'react';
import messageIcon from '../../assets/images/message.svg';
import { Spinner } from 'react-bootstrap';

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

      {isLoadingPostMessage ? (
        <Spinner
          size="sm"
          as="span"
          animation="border"
          variant="info"
          aria-hidden="true"
          className="custom-spinner"
        />
      ) : (
        <img
          src={messageIcon}
          alt=""
          className={`img ${isLoadingPostMessage ? 'disabled' : ''}`}
          onClick={onSend}
          disabled={isLoadingPostMessage}
        />
      )}
    </div>
  );
};

export default MessageFooter;
