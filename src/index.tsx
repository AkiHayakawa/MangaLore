import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/crud.css";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "./18n";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
);
