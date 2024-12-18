import { simulateApiCall } from '../services/SimulateApiCall.js';
import {recuperaDocumenti} from '../services/Axios.js'

export const fetchDocuments = () => async (dispatch) => {
  try {
    dispatch({ type: 'DOCUMENTS_LOADING' }); // Impostiamo lo stato di caricamento
    const documents = await simulateApiCall(); 
    /* const documents = await recuperaDocumenti(); */
    dispatch({ type: 'DOCUMENTS_FETCH_SUCCESS', payload: documents }); // Successo, inviamo i dati
  } catch (error) {
    dispatch({ type: 'DOCUMENTS_FETCH_ERROR', payload: error }); // In caso di errore, inviamo l'errore
  }
};

// Azione per applicare un filtro ai documenti
export const filterDocuments = (filters) => ({
  type: 'FILTER_DOCUMENTS',
  payload: filters,
});