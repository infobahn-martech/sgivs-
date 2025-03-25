import { toast } from 'react-toastify';
import _ from 'lodash';
import { useEffect } from 'react';
// import warningIcon from '../assets/img/warning-icon.svg';
// import infoIcon from '../assets/img/info-icon.svg';
// import successIcon from '../assets/img/success-icon.svg';
// import failedIcon from '../assets/img/error-icon.svg';
import 'react-toastify/dist/ReactToastify.css';
import useAlertReducer from '../../stores/AlertReducer';

const icons = {
  success: '',
  error: '',
};

const colors = {
  success: '#EBF5EF',
  error: '#FF5F60',
  warn: '#EF934D',
  info: '#0263D1',
};

const notify = (message, type, toastPosition, clear) => {
  if (!_.includes(['success', 'error', 'warn', 'info'], type)) return;
  return toast(
    <>
      <div className="toast-body d-flex">
        <div className="icon-wrp">
          <img className="" src={icons[type]} alt="" />
        </div>
        <div className="text-wrp">
          <p className="sm-txt">{message}</p>
        </div>
      </div>
    </>,
    {
      // icon: () => <img src={icons[type]} alt="img" />,
      position: 'top-right',
      autoClose: 5000,
      pauseOnFocusLoss: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      toastId: type + '-' + Date.now(), // Unique toastId based on type and timestamp
      className: type,
      progressStyle: { background: colors[type] },
      onClose: () => clear(),
    }
  );
};

const Toaster = () => {
  const value = useAlertReducer((state) => state.value);
  const clear = useAlertReducer((state) => state.clear);
  useEffect(() => {
    if (value?.message) {
      notify(value?.message, value.type, 'top', clear);
    }
  }, [value]);

  return null;
};

export default Toaster;
