import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import "./index.css"

// import all pages
import NotFoundPage from './pages/NotFoundPage';
import Home from "./pages/HomePage";
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import About from './pages/AboutPage';
import FAQ from './pages/FAQPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </React.StrictMode>
);
