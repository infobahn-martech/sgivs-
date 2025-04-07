import React, { useState } from 'react';
import '../../assets/scss/messages.scss';

import MessageListSidebar from './MessageListSidebar';
import MessageChatContent from './MessageChatContent';

import user1 from '../../assets/images/msg-img-1.png';
import user2 from '../../assets/images/msg-img-2.png';

const Messages = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: 'Elmer Laverty',
      img: user1,
      status: 'Haha oh man 🔥',
    },
    {
      id: 2,
      name: 'Florencio Dorrance',
      img: user2,
      status: 'Haha oh man 🔥',
    },
  ]);

  const [selectedContactId, setSelectedContactId] = useState(1);
  const [allMessages, setAllMessages] = useState({});
  const [message, setMessage] = useState('');

  const selectedContact = contacts?.find((c) => c?.id === selectedContactId);
  const messages = allMessages[selectedContactId] || [];

  const onSend = () => {
    if (!message?.trim()) return;

    const newMessage = { from: 'me', text: message };

    setAllMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
    }));

    setMessage('');
  };

  return (
    <div className="message-body-wrap">
      <MessageListSidebar
        contacts={contacts}
        selectedId={selectedContactId}
        onSelectContact={(id) => setSelectedContactId(id)}
      />
      <MessageChatContent
        selectedContact={selectedContact}
        messages={messages}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  );
};

export default Messages;
