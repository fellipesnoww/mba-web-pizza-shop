import './global.css';

import { RouterProvider } from 'react-router';
import { router } from './pages/router';

export function App() {

  return (
    <RouterProvider router={router} />
  )
}
