import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App/App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux';
import store from './store';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
