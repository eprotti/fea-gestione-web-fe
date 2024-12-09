import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/UserReducer.js';
import documentsReducer from '../reducers/DocumentReducers.js'
import notificationReducer from '../reducers/NotificationReducers.js'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
    documents: documentsReducer,
  },
});

export default store;
