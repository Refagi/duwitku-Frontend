import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import './index.css'
import App from './App.tsx'
import { LazyMotion, domAnimation } from "framer-motion";
import { ToastContainer } from "@/components/ui/ToastContainer.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
       <App />
       <ToastContainer />
      </LazyMotion>
    </QueryClientProvider>
  </StrictMode>,
)
