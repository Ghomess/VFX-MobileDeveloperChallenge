import {configureStore} from '@reduxjs/toolkit';
import stockSlice from '../reducers/stockSlice';
import pairSlice from '../reducers/pairSlice';
import loadingSlice from '../reducers/loadingSlice';

const store = configureStore({
  reducer: {
    ticker: stockSlice,
    pair: pairSlice,
    loading: loadingSlice,
  },
});

export default store;
