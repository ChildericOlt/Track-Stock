import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'urql';
import client from './urqlClient'; // Import your urql client

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire application in the urql Provider */}
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);