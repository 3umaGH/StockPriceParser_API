const express = require("express");
const { getTickerPrice, fetchTickerPrices } = require("./util/util");
const app = express();

const tickerArray = [
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

app.get("/", async (req, res) => {});

fetchTickerPrices(tickerArray, tickerPrices, 6000);

app.listen(3000, "::");

