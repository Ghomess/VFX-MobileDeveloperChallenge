import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ticket: null,
  ticketData: {},
  ticketSearchResults: [],
  ticketMonthSelected: null,
  ticketDateType: 'Monthly',
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    addTicket: (state, action) => {
      console.log('ADD TICKET: ', action.payload);
      state.ticket = action.payload;
    },
    addTicketData: (state, action) => {
      console.log('ADD TICKET DATA: ', action.payload);
      state.ticketData = action.payload;
    },
    addTicketMonthSelected: (state, action) => {
      console.log('ADD TICKET MONTH: ', action.payload);
      state.ticketMonthSelected = action.payload;
    },
    addTicketSearchResults: (state, action) => {
      console.log('ADD TICKET SEARCH RESULTS: ', action.payload);
      state.ticketSearchResults = action.payload;
    },
  },
});

export const {
  addTicket,
  addTicketData,
  addTicketMonthSelected,
  addTicketSearchResults,
} = ticketSlice.actions;

export default ticketSlice.reducer;
