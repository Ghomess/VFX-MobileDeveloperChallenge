import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pair: null,
  pairData: {},
  pairDateSelected: null,
};

const pairSlice = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    addPair: (state, action) => {
      console.log('ADD PAIR: ', action.payload);
      state.ticket = action.payload;
    },
    addPairData: (state, action) => {
      console.log('ADD PAIR DATA: ', action.payload);
      state.pairData = action.payload;
    },
    addPairMonth: (state, action) => {
      console.log('ADD PAIR DATE: ', action.payload);
      state.pairDateSelected = action.payload;
    },
  },
});

export const {addPair, addPairData, addPairMonth} = pairSlice.actions;

export default pairSlice.reducer;
