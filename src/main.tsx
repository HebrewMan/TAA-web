import {StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'virtual:uno.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
   <BrowserRouter>
     <App />
   </BrowserRouter>
 </StrictMode>
)
