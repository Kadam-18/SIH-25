import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
import "./App.css"; // global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


const root = createRoot(document.getElementById("root"));
root.render(<App />);