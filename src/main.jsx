import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import { router } from './Route/Router.jsx';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const queryClient = new QueryClient()

const paypalOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>
           <PayPalScriptProvider options={paypalOptions}>
               <AuthProvider><RouterProvider router={router} /></AuthProvider>
          </PayPalScriptProvider>
        </QueryClientProvider>
   <ToastContainer />
  </StrictMode>,
)
