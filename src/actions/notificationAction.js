export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const MARK_AS_READ = 'MARK_AS_READ';
export const MARK_AS_DISPLAYED = 'MARK_AS_DISPLAYED';

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

// Azione per aggiungere una notifica
export const addNotification = (message, type) => ({
  type: ADD_NOTIFICATION,
  payload: {
    id: Date.now(),  // Usa il timestamp come ID unico
    message,
    type,  // Tipo di notifica (success, error, info, etc.)
    timestamp: new Date().toUTCString(),
  },
});

// Azione per rimuovere una notifica
export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});

// Azione per rimuovere tutte le notifiche
export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  payload: id,
});

export const markAsDisplayed = (id) => ({
  type: MARK_AS_DISPLAYED,
  payload: id,
});