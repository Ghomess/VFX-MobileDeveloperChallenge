import {configureStore} from '@reduxjs/toolkit';
import stockSlice from '../reducers/stockSlice';
import pairSlice from '../reducers/pairSlice';

const store = configureStore({
  reducer: {
    ticker: stockSlice,
    pair: pairSlice,
  },
});

export default store;
