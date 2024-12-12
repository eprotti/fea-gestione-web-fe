import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: "datiGenerali",
  documentDetails: {
    tipologiaFirma: 'SINGOLO_FIRMATARIO',  // Singolo o Multi
    dataScadenza: '',
    marcaTemporale: 'No',  // 'Sì' o 'No'
    titolo: '',
    descrizione: '',
    tipologiaDocumento: '',
    pdfFile: null,  // File PDF
  },
  firmatari: [],
  firme: [],
};

const caricaDocumentoSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setDocumentDetails: (state, action) => {
      state.documentDetails = { ...state.documentDetails, ...action.payload };
    },
    addFirmatario: (state, action) => {
      state.firmatari.push(action.payload);
    },
    removeFirmatario: (state, action) => {
      state.firmatari = state.firmatari.filter(firmatario => firmatario.id !== action.payload);
    },
    addFirma: (state, action) => {
      state.firme.push(action.payload);
    },
    setPdfFile: (state, action) => {
      state.documentDetails.pdfFile = action.payload;
    },
  },
});

export const { setCurrentStep, setDocumentDetails, addFirmatario, removeFirmatario, addFirma, setPdfFile } = caricaDocumentoSlice.actions;
export default caricaDocumentoSlice.reducer;
