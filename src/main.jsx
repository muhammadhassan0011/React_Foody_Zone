import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{ 
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }
  body{ 
    background-color: #323334;
    color: #fff;
    font-size: 2rem;
    min-height: 100vh;
    font-family:  'Inter', sans-serif;
  }
  `;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
