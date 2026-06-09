import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(


  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      toastStyle={{
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    />
  </AuthProvider>


)
