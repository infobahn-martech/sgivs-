import React, { useEffect, useMemo, useState } from 'react';
import '../../assets/scss/messages.scss';

import MessageListSidebar from './MessageListSidebar';
import MessageChatContent from './MessageChatContent';

import messagesReducer from '../../stores/MessagesReducer';
import { getColorClass } from '../../config/config';

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

  // Ensure selectedUsers is always an array
  const safeSelectedUsers = Array.isArray(selectedUsers) ? selectedUsers : [];

  const selectedContact = safeSelectedUsers.find(
    (c) => c?.id === selectedContactId
  );

  // Combine initial messages from API + messages sent in session
  const messages = useMemo(() => {
    const initialMessages =
      selectedContact?.messages?.map((msg) => ({
        from: msg.senderType === 1 ? 'them' : 'me',
        text: msg.message,
        time: msg.createdAt,
      })) || [];

    const localMessages = allMessages[selectedContactId] || [];

    // Merge and optionally sort
    const combined = [...initialMessages, ...localMessages];

    // Sort by timestamp (ISO format)
    return combined.sort((a, b) => new Date(a.time) - new Date(b.time));
  }, [selectedContact, allMessages, selectedContactId]);

  const colorMap = useMemo(() => {
    const map = {};

    safeSelectedUsers.forEach((contact) => {
      if (contact?.id) {
        map[contact.id] = getColorClass(contact.id);
      }
    });

    return map;
  }, [safeSelectedUsers]);

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

  // Ensure safe defaults for props passed to sidebar
  const safeAllContacts = Array.isArray(contacts) ? contacts : [];

  return (
    <div className="message-body-wrap">
      <MessageListSidebar
        isLoadingContact={isLoadingContact}
        contacts={safeSelectedUsers}
        allUsers={safeAllContacts}
        selectedId={selectedContactId}
        onSelectContact={(id) => setSelectedContactId(id)}
        refreshContacts={() => getSelectedUsers({ search: '' })}
        colorMap={colorMap}
      />

      <MessageChatContent
        selectedContact={selectedContact}
        messages={messages}
        message={message}
        selectedId={selectedContactId}
        setMessage={setMessage}
        onSend={onSend}
        colorMap={colorMap}
      />
    </div>
  );
};

export default Messages;
