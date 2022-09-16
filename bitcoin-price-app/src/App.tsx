import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss'
import Loading from './components/Loading';
import bitcoinImage from '/bitcoin.webp';

function App() {
    const [data, setData] = useState({ "time": { "updated": "Sep 15, 2022 09:49:00 UTC", "updatedISO": "2022-09-15T09:49:00+00:00", "updateduk": "Sep 15, 2022 at 10:49 BST" }, "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org", "chartName": "Bitcoin", "bpi": { "USD": { "code": "USD", "symbol": "&#36;", "rate": "20,166.7712", "description": "United States Dollar", "rate_float": 20166.7712 }, "GBP": { "code": "GBP", "symbol": "&pound;", "rate": "16,851.1927", "description": "British Pound Sterling", "rate_float": 16851.1927 }, "EUR": { "code": "EUR", "symbol": "&euro;", "rate": "19,645.3795", "description": "Euro", "rate_float": 19645.3795 } } });

    useEffect(() => {
        // axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        //     .then(res => setData(res.data))
        //     .catch(console.error);
    }, [])

    return (
        <div className="app">
            <div className='background'><img src={bitcoinImage} alt='bitcoin' /></div>
            <header>
                <h1>Bitcoin Price</h1>
            </header>
            <main>
                {
                    !data
                        ? <Loading />
                        : <div className='card'>
                            <span>1 BTC is equal to:</span>
                            <h2>USD</h2>
                            <span className='price'>${data.bpi.USD.rate}</span>
                            <h2>EUR</h2>
                            <span className='price'>€{data.bpi.EUR.rate}</span>
                            <h2>GBP</h2>
                            <span className='price'>£{data.bpi.GBP.rate}</span>
                        </div>
                }

            </main>
            <footer>

            </footer>
        </div>
    )
}

export default App
