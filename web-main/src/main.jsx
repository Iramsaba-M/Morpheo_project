import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Auth0NavProvider } from "@/contexts/auth0-nav-provider";
import { AuthProvider } from "@/contexts/auth-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0NavProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Auth0NavProvider>
  </StrictMode>,
);
