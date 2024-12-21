const initialState = {
    documents: [], // I documenti recuperati
    previousDocuments: [],
    hasChanges: false,
    loading: false, // Stato di caricamento
    error: null, // Messaggio di errore
    filteredDocuments: [],
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
                filteredDocuments: action.payload,
                previousDocuments: state.documents,  // Salva lo stato precedente
                hasChanges: checkForChanges(state.documents, action.payload),
            };
        case 'DOCUMENTS_FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'FILTER_DOCUMENTS':
            const { titolo, descrizione, dataInserimento, dataScadenza, stato } = action.payload;
            const filtered = state.documents.filter(doc => {
                // Filtra in base ai criteri
                return (
                    (!titolo || doc.titolo.includes(titolo)) &&
                    (!descrizione || doc.descrizione.includes(descrizione)) &&
                    (!dataInserimento || (new Date(doc.dataInserimento) >= new Date(dataInserimento[0]) && new Date(doc.dataInserimento) <= new Date(dataInserimento[1]))) &&
                    (!dataScadenza || (new Date(doc.dataScadenza) >= new Date(dataScadenza[0]) && new Date(doc.dataScadenza) <= new Date(dataScadenza[1]))) &&
                    (!stato || doc.stato === stato)
                );
            });
            return { ...state, filteredDocuments: filtered };
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
