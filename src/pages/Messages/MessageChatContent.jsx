// components/messages/MessageChatContent.js
import React from 'react';
import img2 from '../../assets/images/msg-img-2.png';
import MessageFooter from './MessageFooter';

const MessageChatContent = () => {
  return (
    <div className="message-content-wrap">
      <div className="head-wrap">
        <figure className="img">
          <img src={img2} alt="" />
        </figure>
        <div className="name-status-wrap">
          <div className="name">Florencio Dorrance</div>
          <div className="status online">Online</div>
        </div>
      </div>

      <div className="body-msg-wrap">
        <div className="chat-block">
          <figure className="img">
            <img src={img2} alt="" />
          </figure>
          <div className="chat-content-wrap">
            <p className="txt">omg, this is amazing</p>
            <p className="txt">perfect! ✅</p>
            <p className="txt">Wow, this is really epic</p>
          </div>
        </div>

        <div className="chat-block chat-block-right">
          <div className="chat-content-wrap">
            <p className="txt">omg, this is amazing</p>
            <p className="txt">perfect! ✅</p>
            <p className="txt">Wow, this is really epic</p>
          </div>
        </div>
      </div>

      <MessageFooter />
    </div>
  );
};

export default MessageChatContent;
