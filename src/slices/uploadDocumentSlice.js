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
  posizionamentoFirme: 'automatico',
  firmatari: [],
  firme: [{
    id: 1,
    titolo: `Titolo firma 1`,
    obbligatoria: true,
  }],
};

const uploadDocumentSlice = createSlice({
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
    setPosizionamentoFirme: (state, action) => {
      state.posizionamentoFirme = action.payload;
    },
  },
});

export const { setCurrentStep, setDocumentDetails, addFirmatario, removeFirmatario, addFirma, setPdfFile, setPosizionamentoFirme } = uploadDocumentSlice.actions;
export default uploadDocumentSlice.reducer;
