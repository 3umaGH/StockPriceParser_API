const express = require("express");
const { getTickerPrice, fetchTickerPrices } = require("./util/util");
const app = express();

const tickerArray = [
    "EURUSD",
    "VWCE:FRA:EUR",
    "TSLA:NSQ",
    "AMZN:NSQ",
    "NVDA:NSQ",
    "GOOGL:NSQ",
    "AAPL:NSQ",
    "MSFT:NSQ",
    "GOOG:NSQ",
    "SPY:PCQ:USD",
];

const tickerPrices = new Map();

const delay = 1000 * tickerArray.length // 1 second per ticker

fetchTickerPrices(tickerArray, tickerPrices, 100)
setInterval(() => fetchTickerPrices(tickerArray,tickerPrices, delay), 30000)

app.get("/", (req, res) => {
    res.status(200).json(Object.fromEntries(tickerPrices));
});

app.listen(3000, "::");

