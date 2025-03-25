import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import Toaster from './components/common/Toaster';

function App() {
  return (
    <>
      <ToastContainer
        closeButton
        transition={Zoom}
        icon={false}
        theme="light"
      />
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
