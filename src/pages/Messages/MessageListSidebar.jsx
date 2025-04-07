// components/messages/MessageListSidebar.js
import React from 'react';
import plusIcon from '../../assets/images/plus.svg';
import img1 from '../../assets/images/msg-img-1.png';
import img2 from '../../assets/images/msg-img-2.png';

const MessageListSidebar = () => {
  return (
    <div className="message-left-wrap">
      <div className="head">
        <div className="msg-title">Messages</div>
        <div className="icon">
          <img src={plusIcon} alt="plus" />
        </div>
      </div>

      <div className="msg-listing-wrap">
        <div className="search">
          <input type="text" className="txt" placeholder="Search messages" />
        </div>

        <ul className="listing">
          <li>
            <figure className="img">
              <img src={img1} alt="" />
            </figure>
            <div className="name-msg-wrap">
              <div className="name">Elmer Laverty</div>
              <div className="msg">Haha oh man 🔥</div>
            </div>
            <div className="time">12m</div>
          </li>

          <li className="active">
            <figure className="img">
              <img src={img2} alt="" />
            </figure>
            <div className="name-msg-wrap">
              <div className="name">Florencio Dorrance</div>
              <div className="msg">woohoooo</div>
            </div>
            <div className="time">12m</div>
          </li>

          {[...Array(6)]?.map((_, idx) => (
            <li key={idx}>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageListSidebar;
