import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import './assets/index.css';

import router from './routes/index.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
