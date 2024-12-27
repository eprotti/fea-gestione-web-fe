import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import documentsReducer from '../reducers/documentReducer';
import notificationReducer from '../reducers/notificationReducer';
import stepsDocumentReducer from '../reducers/stepsDocumentReducer';
import uploadDocumentSlice from '../slices/uploadDocumentSlice';
import contactReducer from '../reducers/contactReducer';
import signatureReducer from '../slices/signatureSlice';

const Store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
    documents: documentsReducer,
    uploadDocument: uploadDocumentSlice,
    steps: stepsDocumentReducer,
    contacts: contactReducer,
    signatures: signatureReducer,
  },
});

export default Store;
