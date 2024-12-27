import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    availableSignatures: [
        { id: 1, title: 'Firma 1', placed: false, page: undefined },
        { id: 2, title: 'Firma 2', placed: false, page: undefined },
        // altre firme
    ],
    placedSignatures: [],
    currentPage: 1,
};

const signatureSlice = createSlice({
    name: 'signatures',
    initialState,
    reducers: {
        addSignature: (state, action) => {
            const signatureExists = state.placedSignatures.some(
                signature => signature.id === action.payload.id
            );

            if (!signatureExists) {
                let { x, y, page } = action.payload;

                const signature = state.availableSignatures.find(s => s.id === action.payload.id);
                if (signature) {
                    signature.placed = true;
                }

                // Se la firma non ha una pagina associata, metti la pagina corrente come predefinita
                if (page === undefined) {
                    page = state.currentPage;
                }

                action.payload.page = page;

                state.placedSignatures.push({
                    ...action.payload,
                });
            }
        },
        removeSignature: (state, action) => {
            const signature = state.availableSignatures.find(s => s.id === action.payload);
            if (signature) {
                signature.placed = false;
                signature.page = undefined;
            }

            // Rimuovi la firma con l'id specificato
            state.placedSignatures = state.placedSignatures.filter(
                signature => signature.id !== action.payload
            );
        },
        moveSignature: (state, action) => {
            const { id, x, y } = action.payload;
            const signature = state.placedSignatures.find(s => s.id === id);
            if (signature) {
                signature.x = x;
                signature.y = y;
            }
        },
        changePage: (state, action) => {
            state.currentPage = action.payload;  // Cambia la pagina corrente
        },
        resetSignatures: state => {
            state.placedSignatures = [];
        },
    },
});

export const { addSignature, moveSignature, resetSignatures, changePage, removeSignature } = signatureSlice.actions;

export default signatureSlice.reducer;
