module.exports.getTickerPrice = async (stock) => {
  const request = await fetch(
    `https://markets.ft.com/data/equities/tearsheet/charts?s=${stock.symbol}`
  );

  const htmlContent = await request.text();

  const priceRegex = /<span class="mod-ui-data-list__value">([^<]+)<\/span>/;
  const currencyRegex = /Price \(([^)]+)\)/;

  const priceMatch = htmlContent.match(priceRegex);
  const currencyMatch = htmlContent.match(currencyRegex);

  return {
    ticker: stock.symbol,
    type: stock.type,
    price: priceMatch && priceMatch[1] !== undefined ? priceMatch[1] : -1,
    currency:
      currencyMatch && currencyMatch[1] !== undefined
        ? currencyMatch[1]
        : undefined,
    lastUpdate: Date.now(),
  };
};

module.exports.fetchTickerPrices = async (stockArr, tickerPricesMap, delay) => {
  let count = 0;

  stockArr.forEach(async (stock) => {
    setTimeout(async () => {
      try {
        const dataObj = await this.getTickerPrice(stock);
        const oldPrice = (tickerPricesMap.get(stock.symbol) ?? {}).price || -1;

        if (dataObj.price === -1)
          console.log(`Price couldnt be parsed for: ${stock.symbol}`);

        tickerPricesMap.set(stock.symbol, dataObj);

        console.log(
          `Updated ${stock.symbol} price OLD: ${oldPrice} ${dataObj.currency} NEW: ${dataObj.price} ${dataObj.currency}`
        );
      } catch (error) {
        console.error(
          `Error fetching price for ${stock.symbol}: ${error.message}`
        );
      }
    }, (delay / stockArr.length) * count);
    count++;
  });
};
