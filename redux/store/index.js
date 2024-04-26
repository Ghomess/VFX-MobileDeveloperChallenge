import {configureStore} from '@reduxjs/toolkit';
import ticketSlice from '../reducers/ticketSlice';
import pairSlice from '../reducers/pairSlice';

const store = configureStore({
  reducer: {
    ticket: ticketSlice,
    pair: pairSlice,
  },
});

export default store;
