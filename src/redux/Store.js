import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/UserReducer.js';
import documentsReducer from '../reducers/DocumentReducers.js'
import notificationReducer from '../reducers/NotificationReducers.js'
import caricaDocumentoReducer from '../reducers/caricaDocumentoReducers.js'
import caricaDocumentoSlice from '../slices/caricaDocumentoSlice.js'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
    documents: documentsReducer,
    document: caricaDocumentoSlice,
    steps: caricaDocumentoReducer,
  },
});

export default store;
