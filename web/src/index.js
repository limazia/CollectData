import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Compose } from "./components";
import { ForgotProvider, AuthProvider, FormProvider } from "./contexts";

const WrappedApp = Compose(ForgotProvider, AuthProvider, FormProvider)(App);

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <WrappedApp>
      <App />
    </WrappedApp>
  </BrowserRouter>
);
