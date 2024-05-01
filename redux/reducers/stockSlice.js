import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ticker: null,
  stockData: {},
  tickerSearchResults: [],
  stockMonthSelected: null,
  stockDateType: 'Monthly',
  stockPrice: null,
};

const stockSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    addticker: (state, action) => {
      console.log('ADD ticker: ', action.payload);
      state.ticker = action.payload;
    },
    addstockData: (state, action) => {
      console.log('ADD stock DATA: ', action.payload);
      state.stockData = action.payload;
    },
    addstockMonthSelected: (state, action) => {
      console.log('ADD stock MONTH: ', action.payload);
      state.stockMonthSelected = action.payload;
    },
    addtickerSearchResults: (state, action) => {
      console.log('ADD ticker SEARCH RESULTS: ', action.payload);
      state.tickerSearchResults = action.payload;
    },
    addstockPrice: (state, action) => {
      console.log('ADD stock PRICE: ', action.payload);
      state.stockPrice = action.payload;
    },
  },
});

export const {
  addticker,
  addstockData,
  addstockMonthSelected,
  addtickerSearchResults,
  addstockPrice,
} = stockSlice.actions;

export default stockSlice.reducer;
