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
        const priceObj = await this.getTickerPrice(ticker);
        const oldPrice = (tickerPricesMap.get(ticker) ?? {}).price || -1;

        if (priceObj.price === -1)
          console.log(`Price not found on page for: ${priceObj.ticker}`);

        tickerPricesMap.set(ticker, priceObj);

        console.log(
          `Updated ${ticker} price OLD: ${oldPrice} ${priceObj.currency} NEW: ${priceObj.price} ${priceObj.currency}`
        );
      } catch (error) {
        console.error(`Error fetching price for ${ticker}: ${error.message}`);
      }
    }, (delay / tickersArr.length) * count);
    count++;
  });
};
