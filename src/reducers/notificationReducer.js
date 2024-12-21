import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS, HIDE_NOTIFICATION, REMOVE_NOTIFICATION, MARK_AS_READ, MARK_AS_DISPLAYED } from '../actions/notificationAction';

// Stato iniziale: array vuoto per tenere traccia delle notifiche
const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];

    case HIDE_NOTIFICATION:
      return initialState; // Resetta lo stato della notifica

    case REMOVE_NOTIFICATION:
      // Rimuovi la notifica con l'ID specificato
      return state.filter(notification => notification.id !== action.payload);

    case CLEAR_NOTIFICATIONS:
      // Rimuovi tutte le notifiche
      return [];

    case MARK_AS_READ:
      return state.map(notification =>
        notification.id === action.payload ? { ...notification, isRead: true } : notification
      );

    case MARK_AS_DISPLAYED:
      return state.map(notification =>
        notification.id === action.payload ? { ...notification, isDisplayed: true } : notification
      );
    default:
      return state;
  }
};

export default notificationReducer;
