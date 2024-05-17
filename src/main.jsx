import React from 'react'
import { HashRouter, BrowserRouter  } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { changeDataGridReducer } from '@/utils/reducers/index.js';
import './index.css'

const store = createStore(changeDataGridReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
