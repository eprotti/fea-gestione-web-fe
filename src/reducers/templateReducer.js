const initialState = {
  template: [
    [], // Colonna 1
    [], // Colonna 2
    []  // Colonna 3
  ],
};

export default function templateReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_OBJECT':
      return {
        ...state,
        template: [...state.template, action.payload], // Aggiungi un oggetto
      };
    case 'UPDATE_OBJECT_ORDER':
      return {
        ...state,
        template: action.payload, // Aggiorna l'ordine del template
      };
    default:
      return state;
  }
}
