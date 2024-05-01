import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pair: null,
  pairData: [],
  pairDateSelected: '',
  pairDateType: 'Daily',
  pairPrice: null,
};

const pairSlice = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    addPair: (state, action) => {
      console.log('ADD PAIR: ', action.payload);
      state.pair = action.payload;
    },
    addPairData: (state, action) => {
      console.log('ADD PAIR DATA: ', action.payload);
      state.pairData = action.payload;
    },
    addPairDateSelected: (state, action) => {
      console.log('ADD PAIR DATE: ', action.payload);
      state.pairDateSelected = action.payload;
    },
    addPairDateType: (state, action) => {
      console.log('ADD PAIR DATE: ', action.payload);
      state.pairDateType = action.payload;
    },
    addPairPrice: (state, action) => {
      console.log('ADD PAIR PRICE: ', action.payload);
      state.pairPrice = action.payload;
    },
  },
});

export const {
  addPair,
  addPairData,
  addPairDateSelected,
  addPairDateType,
  addPairPrice,
} = pairSlice.actions;

export default pairSlice.reducer;
