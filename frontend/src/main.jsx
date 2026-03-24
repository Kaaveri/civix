<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { PollProvider } from "./context/PollContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <PollProvider>
    <App />
    </PollProvider>
    </AuthProvider>
  </StrictMode>,
)
>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
