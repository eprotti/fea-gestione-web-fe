import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';  // Importa la store e il persistor
import './assets/css/index.css';
import './assets/css/font.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Caricamento...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
