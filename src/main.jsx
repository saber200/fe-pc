import React from "react";
import App from "./appInit";
import { BrowserRouter  } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { initState } from '@/utils/reducers/index.js';
import { createRoot } from "react-dom/client";
import { appState } from "./state";
import "./index.css";

const store = createStore(initState);

let init = (succsss, user, app, permission) => {
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default appState.init(init);
