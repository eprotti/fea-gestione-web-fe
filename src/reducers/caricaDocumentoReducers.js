const initialState = {
    datiGenerali: false,
    ricercaFirmatari: false,
    firmeDocumento: false,
    posizionamentoFirme: false,
  };
  
  // Azione per aggiornare lo stato dello step
  const SET_STEP_COMPLETED = 'SET_STEP_COMPLETED';
  
  export const setStepCompleted = (stepName) => ({
    type: SET_STEP_COMPLETED,
    payload: stepName,
  });
  
  // Reducer per gestire l'aggiornamento degli step
  const caricaDocumentoReducers = (state = initialState, action) => {
    switch (action.type) {
      case SET_STEP_COMPLETED:
        return {
          ...state,
          [action.payload]: true, // Modifica lo stato dello step
        };
      default:
        return state;
    }
  };
  
  export default caricaDocumentoReducers;
  