import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/main/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
