import { Modal } from 'react-bootstrap';
import '../../assets/scss/modal.scss';

const CustomModal = ({
  className,
  dialgName,
  show,
  closeModal,
  body,
  footer,
  header,
  bodyClassname,
  createModal,
  disableCenter,
  contentClassName,
  closeButton,
  renderOnScroll,
}) => {
  return (
    <Modal
      className={className || ''}
      dialogClassName={dialgName || ''}
      contentClassName={contentClassName || ''}
      show={show}
      onHide={closeModal}
      backdrop="static"
      centered={!disableCenter}
    >
      <Modal.Header closeButton={closeButton}>{header }</Modal.Header>
      {createModal ? (
        <Modal.Body className={bodyClassname || ''} ref={renderOnScroll}>
          {body}
        </Modal.Body>
      ) : (
        body
      )}
      {footer || null}
    </Modal>
  );
};

export default CustomModal;
