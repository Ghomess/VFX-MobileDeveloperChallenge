import {changeLoadingChart} from '../redux/reducers/loadingSlice';
import {addPairData, addPairDateType} from '../redux/reducers/pairSlice';
import {
  addstockData,
  addtickerSearchResults,
} from '../redux/reducers/stockSlice';
import {API_KEY} from '@env';
export function tickerSearch(dispatch, search) {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${API_KEY}`;
  //demoURL is used when the I use all the free account callbacks from the API.

  const demoUrl =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';
  fetch(url)
    .then(async result => {
      const data = await result.json();

      let symbols = [];
      try {
        for (let i = 0; i < data.bestMatches.length; i++) {
          let value = data.bestMatches[i][Object.keys(data.bestMatches[0])[0]];
          symbols.push({id: i, name: value});
        }
      } catch (e) {
        console.log('Error: ', e);
      } finally {
        dispatch(addtickerSearchResults(symbols));
      }
    })
    .catch(e => {
      console.log('Error: ', e);
    });
}
export function stockDataFetch(dispatch, ticker) {
  //url with dateType selected and pair selected
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${API_KEY}`;

  console.log('- URL: ', url);
  const demoUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`;

  fetch(url)
    .then(async result => {
      const data = await result.json();
      /*  console.log('--------------');
      console.log('data: ', data);
      console.log('--------------'); */

      const dataMonthly = data['Monthly Time Series'];
      const timestamps = Object.keys(dataMonthly);
      let dataToRedux = [];
      let timestampsArray = [];
      let dataArray = [];

      try {
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
        timestampsArray.reverse();
        dataArray.reverse();
        dataToRedux.push(timestampsArray, dataArray);

        if (dataToRedux.length > 0) {
          dispatch(addstockData(dataToRedux));
        }
      }
    })
    .catch(e => {
      console.log('Error: ', e);
    });
}

export function pairDataFetch(dispatch, pair, dateType) {
  const splitCurrencyPair = pair.split('/');

  const from_symbol = splitCurrencyPair[0];
  const to_symbol = splitCurrencyPair[1];
  console.log('from Symbol ', from_symbol, '/ to_symbol: ', to_symbol);

  const dateTypeUpperCase = dateType.toUpperCase();
  const dateTypeString = dateType;

  //url with dateType selected and pair selected
  const url = `https://www.alphavantage.co/query?function=FX_${dateTypeUpperCase}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${API_KEY}`;

  console.log('- URL: ', url);
  const demoUrl = `https://www.alphavantage.co/query?function=FX_${dateTypeUpperCase}&from_symbol=EUR&to_symbol=USD&apikey=demo`;
  console.log('URL Demo: ', dateTypeString);
  fetch(url)
    .then(async result => {
      const data = await result.json();
      /*  console.log('--------------');
      console.log('data: ', data);
      console.log('--------------'); */

      const rawData = data[`Time Series FX (${dateTypeString})`];
      const timestamps = Object.keys(rawData);
      let dataToRedux = [];
      let timestampsArray = [];
      let dataArray = [];
      let dataLength;
      if (dateTypeString === 'Daily') {
        dataLength = 7;
      } else if (dateTypeString === 'Weekly') {
        dataLength = 4;
      } else if (dateTypeString === 'Monthly') {
        dataLength = 12;
      }

      console.log('dataLength: ', dataLength);
      try {
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
        timestampsArray.reverse();
        dataArray.reverse();
        dataToRedux.push(timestampsArray, dataArray);

        if (dataToRedux.length > 0) {
          dispatch(addPairData(dataToRedux));
        }
      }
    })
    .catch(e => {
      console.log('Error: ', e);
    });
}
