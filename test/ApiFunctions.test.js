import {addPairData} from '../redux/reducers/pairSlice';
import {
  addStockData,
  addTickerSearchResults,
} from '../redux/reducers/stockSlice';

import store from '../redux/store';

import {
  pairDataFetch,
  stockDataFetch,
  tickerSearch,
} from '../utils/apiFunctions';
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('API fetch functions', () => {
  const dispatchMock = jest.spyOn(store, 'dispatch');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('check if tickers are sent with addTickerSearchResults in the tickerSearch fetch ', async () => {
    const search = 'T';
    const dataSearchMocked = {
      bestMatches: [
        {
          '1. symbol': 'TSCO.LON',
          '2. name': 'Tesco PLC',
          '3. type': 'Equity',
          '4. region': 'United Kingdom',
          '5. marketOpen': '08:00',
          '6. marketClose': '16:30',
          '7. timezone': 'UTC+01',
          '8. currency': 'GBX',
          '9. matchScore': '0.7273',
        },
        {
          '1. symbol': 'TSCDF',
          '2. name': 'Tesco plc',
          '3. type': 'Equity',
          '4. region': 'United States',
          '5. marketOpen': '09:30',
          '6. marketClose': '16:00',
          '7. timezone': 'UTC-04',
          '8. currency': 'USD',
          '9. matchScore': '0.7143',
        },
        {
          '1. symbol': 'TSCDY',
          '2. name': 'Tesco plc',
          '3. type': 'Equity',
          '4. region': 'United States',
          '5. marketOpen': '09:30',
          '6. marketClose': '16:00',
          '7. timezone': 'UTC-04',
          '8. currency': 'USD',
          '9. matchScore': '0.7143',
        },
        {
          '1. symbol': 'TCO2.FRK',
          '2. name': 'TESCO PLC ADR/1 LS-05',
          '3. type': 'Equity',
          '4. region': 'Frankfurt',
          '5. marketOpen': '08:00',
          '6. marketClose': '20:00',
          '7. timezone': 'UTC+02',
          '8. currency': 'EUR',
          '9. matchScore': '0.5455',
        },
        {
          '1. symbol': 'TCO0.FRK',
          '2. name': 'TESCO PLC LS-0633333',
          '3. type': 'Equity',
          '4. region': 'Frankfurt',
          '5. marketOpen': '08:00',
          '6. marketClose': '20:00',
          '7. timezone': 'UTC+02',
          '8. currency': 'EUR',
          '9. matchScore': '0.5455',
        },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(dataSearchMocked),
    });
    const tickers = await tickerSearch(dispatchMock, search);

    expect(dispatchMock).toHaveBeenCalledWith(
      addTickerSearchResults([
        {id: 0, name: 'TSCO.LON'},
        {id: 1, name: 'TSCDF'},
        {id: 2, name: 'TSCDY'},
        {id: 3, name: 'TCO2.FRK'},
        {id: 4, name: 'TCO0.FRK'},
      ]),
    );
    console.log('❣', tickers);
    expect(tickers).toBeDefined();
    expect(tickers.length).toBeGreaterThan(0);

    delete global.fetch;
    global.fetch = jest.fn();
  });
  test('check if tickers are sent with stockDataFetch in the tickerSearch ', async () => {
    const ticker = 'TSCO.LON';
    const dataStockFetch = {
      'Meta Data': {
        '1. Information': 'Monthly Prices (open, high, low, close) and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2024-05-15',
        '4. Time Zone': 'US/Eastern',
      },
      'Monthly Time Series': {
        '1999-12-31': {
          '1. open': '102.5600',
          '2. high': '122.1200',
          '3. low': '102.2500',
          '4. close': '107.8700',
          '5. volume': '158626300',
        },
        '2000-01-31': {
          '1. open': '112.4400',
          '2. high': '124.7500',
          '3. low': '109.6200',
          '4. close': '112.2500',
          '5. volume': '175259600',
        },
        '2000-02-29': {
          '1. open': '112.3700',
          '2. high': '119.7500',
          '3. low': '100.9400',
          '4. close': '102.7500',
          '5. volume': '133524400',
        },
        '2000-03-31': {
          '1. open': '102.0000',
          '2. high': '128.2500',
          '3. low': '99.5000',
          '4. close': '118.3700',
          '5. volume': '194329000',
        },
        '2000-04-28': {
          '1. open': '120.0000',
          '2. high': '128.0000',
          '3. low': '101.2500',
          '4. close': '111.5000',
          '5. volume': '168464800',
        },
        '2000-05-31': {
          '1. open': '112.5000',
          '2. high': '113.6200',
          '3. low': '102.0000',
          '4. close': '107.3100',
          '5. volume': '123803200',
        },
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(dataStockFetch),
    });
    const dataToRedux = await stockDataFetch(dispatchMock, ticker);

    expect(dispatchMock).toHaveBeenCalledWith(addStockData(dataToRedux));
    expect(dataToRedux).toBeDefined();
    expect(dataToRedux.length).toBeGreaterThan(0);
    global.fetch.mockClear();
  });

  test('check if data is sent to redux with the dataPairFetch fetch', async () => {
    const pair = 'EUR/USD';
    const dateType = 'Daily';
    const dataPairFetch = {
      'Meta Data': {
        '1. Information': 'Forex Daily Prices (open, high, low, close)',
        '2. From Symbol': 'EUR',
        '3. To Symbol': 'USD',
        '4. Output Size': 'Compact',
        '5. Last Refreshed': '2024-05-16 16:10:00',
        '6. Time Zone': 'UTC',
      },
      'Time Series FX (Daily)': {
        '2023-12-26': {
          '1. open': '1.10594',
          '2. high': '1.10842',
          '3. low': '1.10338',
          '4. close': '1.10374',
        },
        '2023-12-27': {
          '1. open': '1.10594',
          '2. high': '1.10842',
          '3. low': '1.10338',
          '4. close': '1.10374',
        },
        '2023-12-28': {
          '1. open': '1.10594',
          '2. high': '1.10842',
          '3. low': '1.10338',
          '4. close': '1.10374',
        },
        '2023-12-29': {
          '1. open': '1.10594',
          '2. high': '1.10842',
          '3. low': '1.10338',
          '4. close': '1.10374',
        },
        '2024-01-01': {
          '1. open': '1.10400',
          '2. high': '1.10460',
          '3. low': '1.10340',
          '4. close': '1.10440',
        },
        '2024-01-02': {
          '1. open': '1.10438',
          '2. high': '1.10454',
          '3. low': '1.09380',
          '4. close': '1.09416',
        },
        '2024-01-03': {
          '1. open': '1.09414',
          '2. high': '1.09654',
          '3. low': '1.08928',
          '4. close': '1.09215',
        },
        '2024-01-04': {
          '1. open': '1.09209',
          '2. high': '1.09722',
          '3. low': '1.09142',
          '4. close': '1.09447',
        },
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(dataPairFetch),
    });
    const dataToRedux = await pairDataFetch(dispatchMock, pair, dateType);

    expect(dispatchMock).toHaveBeenCalledWith(addPairData(dataToRedux));
    expect(dataToRedux).toBeDefined();
    expect(dataToRedux.length).toBeGreaterThan(0);
    global.fetch.mockClear();
  });
});
