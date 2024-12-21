import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer.js';
import documentsReducer from '../reducers/documentReducer'
import notificationReducer from '../reducers/notificationReducer'
import stepsDocumentReducer from '../reducers/stepsDocumentReducer'
import uploadDocumentSlice from '../slices/uploadDocumentSlice'
import contactReducer from '../reducers/contactReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
    documents: documentsReducer,
    uploadDocument: uploadDocumentSlice,
    steps: stepsDocumentReducer,
    contacts: contactReducer
  },
});

export default store;
