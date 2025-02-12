import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage di default

import contactReducer from '../reducers/contactReducer';
import currentStepReducer from '../reducers/currentStepReducer';
import documentsReducer from '../reducers/documentReducer';
import notificationReducer from '../reducers/notificationReducer';
import signatureReducer from '../reducers/signatureReducer';
import stepsDocumentReducer from '../reducers/stepsDocumentReducer';
import userReducer from '../reducers/userReducer';
import templateReducer from '../reducers/templateReducer';

// Configura la persistenza
const persistConfig = {
  key: 'root',        // La chiave che useremo per identificare lo stato persistente
  storage,            // Usa localStorage come meccanismo di persistenza
  whitelist: ['notifications'],  // Persisti solo la parte dello stato delle firme
  // blacklist: ['user'],  // Oppure puoi escludere una parte dello stato
};

// Combina i reducer
const rootReducer = {
  notifications: notificationReducer,
  user: userReducer,
  documents: documentsReducer,
  currentStep: currentStepReducer,
  steps: stepsDocumentReducer,
  contacts: contactReducer,
  signatures: signatureReducer,
  template: templateReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);