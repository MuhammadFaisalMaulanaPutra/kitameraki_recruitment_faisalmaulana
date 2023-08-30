import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
initializeIcons();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
