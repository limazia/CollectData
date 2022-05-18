import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
<<<<<<< Updated upstream
=======
import { Compose } from "./components";
import { ForgotProvider, AuthProvider, FormProvider } from "./contexts";

const WrappedApp = Compose(ForgotProvider, AuthProvider, FormProvider)(App);
>>>>>>> Stashed changes

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
