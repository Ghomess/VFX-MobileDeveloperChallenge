import {addPairData} from '../redux/reducers/pairSlice';
import {
  addStockData,
  addTickerSearchResults,
} from '../redux/reducers/stockSlice';
import {API_KEY} from '@env';

export async function tickerSearch(dispatch, search) {
  //URL with the value entered by the user in the search bar
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${API_KEY}`;

  //demoURL is used when I used all the free account callbacks from the API.
  const demoUrl =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';
  const response = await fetch(url);
  const data = await response.json();
  console.log('DATA SEARCH:::: ', data);

  let tickers = [];
  try {
    //loop through all bestMatches and add all tickers to the tickers array
    for (let i = 0; i < data.bestMatches.length; i++) {
      let value = data.bestMatches[i][Object.keys(data.bestMatches[0])[0]];
      tickers.push({id: i, name: value});
    }
  } catch (e) {
    console.log('Error: ', e);
  } finally {
    dispatch(addTickerSearchResults(tickers));
  }

  return tickers;
}
export async function stockDataFetch(dispatch, ticker) {
  //url with dateType selected and pair selected
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${API_KEY}`;

  console.log('- URL: ', url);
  const demoUrl =
    'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo';
  const response = await fetch(url);
  const data = await response.json();
  let dataToRedux = [];
  let timestampsArray = [];
  let dataArray = [];
  /*  console.log('--------------');
      console.log('data: ', data);
      console.log('--------------'); */

  //assigns all monthly values and dates into the dataMonthly variable;
  const dataMonthly = data['Monthly Time Series'];
  console.log('DATA:::: ', data);

  //assigns all the dates to the timestamps variable;
  const timestamps = Object.keys(dataMonthly);

  try {
    //loop through all data and add all dates to the timestampsArray and all the values into the dataArray
    for (let i = 0; i < 12; i++) {
      const timestamp = timestamps[i];
      /*   console.log('Timestamp:', timestamp);
          console.log('Data:', dataDaily[timestamp]);
          console.log('--------------------'); */

      timestampsArray.push(timestamp);

      dataArray.push(parseFloat(dataMonthly[timestamp]['4. close']));
    }
  } catch (e) {
    console.log('Error: ', e);
  } finally {
    //reverse the data because the first values of the timestampsArray and the dataArray are the oldest
    timestampsArray.reverse();
    dataArray.reverse();
    //and then pushes into the dataToRedux array
    dataToRedux.push(timestampsArray, dataArray);

    //if the data received from the fetch is not empty it dispatches into the stockData
    if (dataToRedux.length > 0) {
      dispatch(addStockData(dataToRedux));
    }
  }

  return dataToRedux;
}

export async function pairDataFetch(dispatch, pair, dateType) {
  const splitCurrencyPair = pair.split('/');

  const from_symbol = splitCurrencyPair[0];
  const to_symbol = splitCurrencyPair[1];
  console.log('from Symbol ', from_symbol, '/ to_symbol: ', to_symbol);

  const dateTypeUpperCase = dateType.toUpperCase();
  const dateTypeString = dateType;

  //url with dateType selected and pair selected
  const url = `https://www.alphavantage.co/query?function=FX_${dateTypeUpperCase}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${API_KEY}`;

  const demoUrl = `https://www.alphavantage.co/query?function=FX_${dateTypeUpperCase}&from_symbol=EUR&to_symbol=USD&apikey=demo`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data PAIRDATA: ', data);
  /*  console.log('--------------');
      console.log('data: ', data);
      console.log('--------------'); */

  const rawData = data[`Time Series FX (${dateTypeString})`];
  const timestamps = Object.keys(rawData);
  let dataToRedux = [];
  let timestampsArray = [];
  let dataArray = [];
  let dataLength;
  //assign a dataLength depending on the dateType selected by the user
  if (dateTypeString === 'Daily') {
    dataLength = 7;
  } else if (dateTypeString === 'Weekly') {
    dataLength = 4;
  } else if (dateTypeString === 'Monthly') {
    dataLength = 12;
  }

  console.log('dataLength: ', dataLength);
  try {
    //loop through all data and add all dates to the timestampsArray and all the values into the dataArray

    for (let i = 0; i < dataLength; i++) {
      const timestamp = timestamps[i];
      /*   console.log('Timestamp:', timestamp);
          console.log('Data:', dataDaily[timestamp]);
          console.log('--------------------'); */

      timestampsArray.push(timestamp);

      dataArray.push(parseFloat(rawData[timestamp]['4. close']));
    }
  } catch (e) {
    console.log('Error: ', e);
  } finally {
    //reverse the data because the first values of the timestampsArray and the dataArray are the oldest
    timestampsArray.reverse();
    dataArray.reverse();
    dataToRedux.push(timestampsArray, dataArray);
    //if the data received from the fetch is not empty it dispatches into the pairData
    if (dataToRedux.length > 0) {
      dispatch(addPairData(dataToRedux));
    }
  }
  return dataToRedux;
}
