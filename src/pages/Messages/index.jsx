import React, { useEffect, useState } from 'react';
import '../../assets/scss/messages.scss';

import MessageListSidebar from './MessageListSidebar';
import MessageChatContent from './MessageChatContent';

import messagesReducer from '../../stores/MessagesReducer';

const Messages = () => {
  const {
    getSelectedUsers,
    selectedUsers,
    getAllContacts,
    contacts,
    isLoadingContact,
  } = messagesReducer((state) => state);

  useEffect(() => {
    getAllContacts();
    getSelectedUsers({ search: '' });
  }, []);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [allMessages, setAllMessages] = useState({});
  const [message, setMessage] = useState('');

  const selectedContact = selectedUsers?.find(
    (c) => c?.id === selectedContactId
  );

  const messages = allMessages[selectedContactId] || [];

  const onSend = () => {
    if (!message?.trim()) return;

    const newMessage = {
      from: 'me',
      text: message,
      time: new Date().toISOString(),
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
    }));

    setMessage('');
  };

  return (
    <div className="message-body-wrap">
      <MessageListSidebar
        isLoadingContact={isLoadingContact}
        contacts={selectedUsers}
        allUsers={contacts}
        selectedId={selectedContactId}
        onSelectContact={(id) => setSelectedContactId(id)}
        refreshContacts={() => getSelectedUsers({ search: '' })}
      />
      <MessageChatContent
        selectedContact={selectedContact}
        messages={messages}
        message={message}
        selectedId={selectedContactId}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  );
};

export default Messages;
