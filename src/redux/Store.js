import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import documentsReducer from '../reducers/documentReducer';
import notificationReducer from '../reducers/notificationReducer';
import stepsDocumentReducer from '../reducers/stepsDocumentReducer';
import currentStepReducer from '../reducers/currentStepReducer';
import contactReducer from '../reducers/contactReducer';
import signatureReducer from '../reducers/signatureReducer';

const Store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
    documents: documentsReducer,
    currentStep: currentStepReducer,
    steps: stepsDocumentReducer,
    contacts: contactReducer,
    signatures: signatureReducer,
  },
});

export default Store;
