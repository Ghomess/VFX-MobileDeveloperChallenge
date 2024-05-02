import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loadingChart: false,
  loadingSearchResults: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoadingChart: (state, action) => {
      console.log('CHANGE loadingChart: ', action.payload);
      state.loadingChart = action.payload;
    },
    changeLoadingSearchResults: (state, action) => {
      console.log('CHANGE loadingSearchResults: ', action.payload);
      state.loadingSearchResults = action.payload;
    },
  },
});

export const {changeLoadingChart, changeLoadingSearchResults} =
  loadingSlice.actions;

export default loadingSlice.reducer;
