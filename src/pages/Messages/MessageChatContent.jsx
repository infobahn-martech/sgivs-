import MessageFooter from './MessageFooter';

const MessageChatContent = ({
  selectedContact,
  messages,
  message,
  setMessage,
  onSend,
}) => {
  return (
    <div className="message-content-wrap">
      <div className="head-wrap">
        <figure className="img">
          <img src={selectedContact?.img} alt="" />
        </figure>
        <div className="name-status-wrap">
          <div className="name">{selectedContact.name}</div>
          <div className="status online">Online</div>
        </div>
      </div>

      <div className="body-msg-wrap">
        {messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-block ${
              msg.from === 'me' ? 'chat-block-right' : ''
            }`}
          >
            {msg.from === 'them' && (
              <figure className="img">
                <img src={selectedContact?.img} alt="" />
              </figure>
            )}
            <div className="chat-content-wrap">
              <p className="txt">{msg?.text}</p>
            </div>
          </div>
        ))}
      </div>

      <MessageFooter
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  );
};

export default MessageChatContent;
