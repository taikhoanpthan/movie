import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Detail from "./pages/detail";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/detail/:id", element: <Detail /> },
      ],
    },
  ]);
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
