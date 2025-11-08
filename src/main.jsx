import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/globals.css";

import { Provider } from "react-redux";
import { store } from "./store/index.js";

import { AuthProvider } from "./context/AuthContext.jsx";
import AssetsProvider from "./context/AssetsContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,           // 1 min “fresco”
      refetchOnWindowFocus: false,    // não refetcha só por focar a aba
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AssetsProvider>
              <App />
            </AssetsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
