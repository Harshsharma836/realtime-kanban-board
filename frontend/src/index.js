import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <RoleProvider>
      <App />
    </RoleProvider>
  </ThemeProvider>
);
