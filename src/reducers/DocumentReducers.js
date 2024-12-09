// src/reducers/DocumentReducer.js
const initialState = {
    documents: [], // I documenti recuperati
    previousDocuments: [],
    hasChanges: false,
    loading: false, // Stato di caricamento
    error: null, // Messaggio di errore
};

const documentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DOCUMENTS_LOADING':
            return { ...state, loading: true, error: null };
        case 'DOCUMENTS_FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                documents: action.payload,
                previousDocuments: state.documents,  // Salva lo stato precedente
                hasChanges: checkForChanges(state.documents, action.payload),
            };
        case 'DOCUMENTS_FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Funzione di utilità per il confronto tra lo stato attuale e quello precedente
const checkForChanges = (previousDocuments, newDocuments) => {
    if (previousDocuments.length == 0) return false;
    if (previousDocuments.length !== newDocuments.length) return true;

    // Confronta ogni documento basato su un campo unico, ad esempio 'id'
    return newDocuments.some((newDoc, index) => {
        const prevDoc = previousDocuments[index];
        return newDoc.stato !== prevDoc.stato || newDoc.otherField !== prevDoc.otherField;
    });
};

export default documentReducer;
