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
    addTicker: (state, action) => {
      console.log('ADD ticker: ', action.payload);
      state.ticker = action.payload;
    },
    addStockData: (state, action) => {
      console.log('ADD stock DATA: ', action.payload);
      state.stockData = action.payload;
    },
    addStockMonthSelected: (state, action) => {
      console.log('ADD stock MONTH: ', action.payload);
      state.stockMonthSelected = action.payload;
    },
    addTickerSearchResults: (state, action) => {
      console.log('ADD ticker SEARCH RESULTS: ', action.payload);
      state.tickerSearchResults = action.payload;
    },
    addStockPrice: (state, action) => {
      console.log('ADD stock PRICE: ', action.payload);
      state.stockPrice = action.payload;
    },
  },
});

export const {
  addTicker,
  addStockData,
  addStockMonthSelected,
  addTickerSearchResults,
  addStockPrice,
} = stockSlice.actions;

export default stockSlice.reducer;
