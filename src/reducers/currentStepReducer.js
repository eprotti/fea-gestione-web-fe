import { createSlice } from '@reduxjs/toolkit';
import Steps from '../enum/Steps';

const initialState = {
  currentStep: Steps.DATI_GENERALI,
};

const currentStepReducer = createSlice({
  name: "currentStep",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep } = currentStepReducer.actions;
export default currentStepReducer.reducer;
