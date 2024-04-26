import {addTicketSearchResults} from '../redux/reducers/ticketSlice';

export function tickerSearch(dispatch, search) {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.API_KEY}`;
  //demoURL is used when the I use all the free account callbacks from the API.
  const demoUrl =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';
  fetch(url)
    .then(async result => {
      const data = await result.json();

      const symbols = [];
      try {
        for (let i = 0; i < data.bestMatches.length; i++) {
          let value = data.bestMatches[i][Object.keys(data.bestMatches[0])[0]];
          symbols.push({id: i, name: value});
          //symbols.push(data.bestMatches[i][Object.keys(data.bestMatches[0])[0]]);
        }
      } catch (e) {
        console.log('Error: ', e);
      } finally {
        dispatch(addTicketSearchResults(symbols));
      }
    })
    .catch(e => {
      console.log('Error: ', e);
    });
}
