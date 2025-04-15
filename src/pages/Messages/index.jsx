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
    postMessage,
  } = messagesReducer((state) => state);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [allMessages, setAllMessages] = useState({});
  const [message, setMessage] = useState('');

  // Get current user's ID from localStorage or auth context
  const currentUserId = localStorage.getItem('userId'); // Adjust this as per your auth setup

  // Fetch contacts & selected users on mount
  useEffect(() => {
    getAllContacts();
    getSelectedUsers({ search: '' });
  }, []);

  // Defensive checks
  const safeSelectedUsers = Array.isArray(selectedUsers) ? selectedUsers : [];
  const safeAllContacts = Array.isArray(contacts) ? contacts : [];

  const selectedContact = safeSelectedUsers.find(
    (c) => c?.id === selectedContactId
  );

  // Combine backend + local messages
  const messages = useMemo(() => {
    const initialMessages =
      selectedContact?.messages?.map((msg) => ({
        from: msg.senderType === 1 ? 'me' : 'them', // ✅ FIXED!
        text: msg.message,
        time: msg.createdAt,
      })) || [];

    const localMessages = allMessages[selectedContactId] || [];

    const combined = [...initialMessages, ...localMessages];

    return combined.sort((a, b) => new Date(a.time) - new Date(b.time));
  }, [selectedContact, allMessages, selectedContactId]);

  // Color map for consistent avatars
  const colorMap = useMemo(() => {
    const map = {};

    safeSelectedUsers.forEach((contact) => {
      if (contact?.id) {
        map[contact.id] = getColorClass(contact.id);
      }
    });

    return map;
  }, [safeSelectedUsers]);

  // Send a new message via API
  const onSend = () => {
    if (!message?.trim() || !selectedContactId || !selectedContact?.id) return;

    const trimmedMessage = message.trim();
    setMessage('');

    postMessage(
      {
        conversationId: selectedContact?.id,
        message: trimmedMessage,
      },
      (response) => {
        // ❌ REMOVE this to prevent duplicate
        // const newMessage = {
        //   from: 'me',
        //   text: trimmedMessage,
        //   time: new Date().toISOString(),
        // };

        // setAllMessages((prev) => ({
        //   ...prev,
        //   [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
        // }));

        // ✅ Instead, just refresh from server
        getSelectedUsers({ search: '' });
      },
      (error) => {
        console.error('Failed to send message:', error);
        setMessage(trimmedMessage); // restore input
      }
    );
  };

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
