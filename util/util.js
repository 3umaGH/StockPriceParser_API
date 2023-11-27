module.exports.getTickerPrice = async (ticker) => {
  const request = await fetch(
    `https://markets.ft.com/data/equities/tearsheet/charts?s=${ticker}`
  );

  const htmlContent = await request.text();

  const priceRegex = /<span class="mod-ui-data-list__value">([^<]+)<\/span>/;
  const currencyRegex = /Price \(([^)]+)\)/;

  const priceMatch = htmlContent.match(priceRegex);
  const currencyMatch = htmlContent.match(currencyRegex);

  return {
    ticker: ticker,
    price: priceMatch && priceMatch[1] !== undefined ? priceMatch[1] : -1,
    currency:
      currencyMatch && currencyMatch[1] !== undefined
        ? currencyMatch[1]
        : undefined,
    lastUpdate: Date.now(),
  };
};

module.exports.fetchTickerPrices = async (
  tickersArr,
  tickerPricesMap,
  delay
) => {
  let count = 0;

  tickersArr.forEach(async (ticker) => {
    setTimeout(async () => {
      try {
        const price = await this.getTickerPrice(ticker);

        tickerPricesMap.set(ticker, price);
        console.log(tickerPricesMap.size);
      } catch (error) {
        console.error(`Error fetching price for ${ticker}: ${error.message}`);
      }
    }, (delay / tickersArr.length) * count);
    count++;
  });
};
