import React from 'react';

import '../../assets/scss/messages.scss';

import plusIcon from '../../assets/images/plus.svg';
import messageIcon from '../../assets/images/message.svg';
import img1 from '../../assets/images/msg-img-1.png';
import img2 from '../../assets/images/msg-img-2.png';

const Messages = () => {
  return (
    <div className="message-body-wrap">
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
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Titus Kitamura</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
            <li>
              <figure className="img">
                <img src={img1} alt="" />
              </figure>
              <div className="name-msg-wrap">
                <div className="name">Elmer Laverty</div>
                <div className="msg">Haha oh man </div>
              </div>
              <div className="time">12m</div>
            </li>
          </ul>
        </div>
      </div>

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

        <div className="footer-wrap">
          <input type="text" className="text" placeholder="Type a message" />{' '}
          <img src={messageIcon} alt="" className="img" />
        </div>
      </div>
    </div>
  );
};

export default Messages;
