import React from 'react';

import '../../assets/scss/messages.scss';

import MessageFooter from './MessageFooter';
import MessageListSidebar from './MessageListSidebar';
import MessageChatContent from './MessageChatContent';

const Messages = () => {
  return (
    <div className="message-body-wrap">
      <MessageListSidebar />
      <MessageChatContent />
    </div>
  );
};

export default Messages;
