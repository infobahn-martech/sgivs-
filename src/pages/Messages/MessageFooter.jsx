import messageIcon from '../../assets/images/message-ico.svg';

const MessageFooter = () => {
  return (
    <div className="footer-wrap">
      <input type="text" className="text" placeholder="Type a message" />{' '}
      <img src={messageIcon} alt="" className="img" />
    </div>
  );
};

export default MessageFooter;
