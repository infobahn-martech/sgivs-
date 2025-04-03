import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './assets/css/index.css';
import './assets/scss/common.scss';

import router from './routes/index.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
