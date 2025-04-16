import React, { useEffect, useMemo, useState } from 'react';
import '../../assets/scss/messages.scss';

import MessageListSidebar from './MessageListSidebar';
import MessageChatContent from './MessageChatContent';

import messagesReducer from '../../stores/MessagesReducer';
import { getColorClass } from '../../config/config';

const Messages = () => {
  const {
    getSelectedUsers,
    getAllContacts,
    contacts,
    isLoadingContact,
    postMessage,
  } = messagesReducer((state) => state);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [message, setMessage] = useState('');
  const [allContacts, setAllContacts] = useState([]);
  const [newMessageForChat, setNewMessageForChat] = useState(null); // 👈

  const handleRefreshSidebar = () => {
    getSelectedUsers({ search: '', page: 1, limit: 10 });
  };

  const safeAllContacts = Array.isArray(contacts) ? contacts : [];

  const selectedContact = allContacts?.find((c) => c?.id === selectedContactId);

  const messages = useMemo(() => {
    return (
      selectedContact?.messages
        ?.map((msg) => ({
          from: msg.senderType === 1 ? 'me' : 'them',
          text: msg.message,
          time: msg.createdAt,
        }))
        ?.sort((a, b) => new Date(a.time) - new Date(b.time)) || []
    );
  }, [selectedContact]);

  const colorMap = useMemo(() => {
    const map = {};
    allContacts?.forEach((contact) => {
      if (contact?.id) {
        map[contact.id] = getColorClass(contact.id);
      }
    });
    return map;
  }, [allContacts]);

  const onSend = () => {
    if (!message?.trim() || !selectedContactId || !selectedContact?.id) return;

    const trimmedMessage = message.trim();
    const newMessage = {
      id: crypto.randomUUID(),
      senderType: 1,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update contact
    setAllContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedContactId
          ? {
              ...contact,
              messages: [...(contact.messages || []), newMessage],
            }
          : contact
      )
    );

    // Update chat content
    setNewMessageForChat(newMessage);
    setMessage('');

    postMessage(
      {
        conversationId: selectedContact?.id,
        message: trimmedMessage,
      },
      () => {
        handleRefreshSidebar();
      },
      (error) => {
        console.error('Failed to send:', error);
        setMessage(trimmedMessage);
      }
    );
  };

  useEffect(() => {
    getAllContacts();
    handleRefreshSidebar();
  }, []);

  return (
    <div className="message-body-wrap">
      <MessageListSidebar
        isLoadingContact={isLoadingContact}
        selectedId={selectedContactId}
        onSelectContact={setSelectedContactId}
        refreshContacts={handleRefreshSidebar}
        colorMap={colorMap}
        allUsers={safeAllContacts}
        allContacts={allContacts}
        setAllContacts={setAllContacts}
      />

      <MessageChatContent
        isLoadingContact={isLoadingContact}
        selectedContact={selectedContact}
        messages={messages}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
        colorMap={colorMap}
        newMessage={newMessageForChat} // 👈
      />
    </div>
  );
};

export default Messages;
