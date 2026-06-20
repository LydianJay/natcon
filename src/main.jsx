import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../vendor/fontawesome/css/all.min.css';
import '../vendor/fontawesome/js/all.min.js';

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


import App from './App.jsx'
import RegistrationPage from './pages/RegistrationForm.jsx';
import Exhibitors from './pages/ExhibitorsPerspectus.jsx';

import regisLoader from './loaders/RegistrationLoader.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { 
    path: "registration",
    loader:  regisLoader,
    element: <RegistrationPage /> 
  },
  {
    path: "exhibitors",
    element: <Exhibitors />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
