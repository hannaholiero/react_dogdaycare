import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/index.css";

import { DogProvider } from "./DogContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DogProvider>
      <App />
    </DogProvider>
  </React.StrictMode>
);
