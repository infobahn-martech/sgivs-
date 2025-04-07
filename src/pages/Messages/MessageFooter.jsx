import React from 'react';
import messageIcon from '../../assets/images/message.svg';

const MessageFooter = ({ message, setMessage, onSend }) => {
  return (
    <div className="footer-wrap">
      <input
        type="text"
        className="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <img src={messageIcon} alt="" className="img" onClick={onSend} />
    </div>
  );
};

export default MessageFooter;
