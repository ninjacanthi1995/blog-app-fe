import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogList from './pages/BlogList/BlogList';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import BlogForm from './pages/BlogForm/BlogForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogList />,
  },
  {
    path: "/add-blog",
    element: <BlogForm />,
  },
  {
    path: "/:blogId",
    element: <BlogDetail />
  },
  {
    path: "/:blogId/edit",
    element: <BlogForm />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
