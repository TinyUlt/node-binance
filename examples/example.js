//const binance = require('../node-binance-api.js');
let APIKEY = 'zSehYr8Dg1RrDGfE95MbKpIZ3jDZDCkKHsRKevpH8IAqNHWDmszCgTA7x5MsW6kj';
let APISECRET = 'WG1OjqRhlHGTlP6nliWKti52bvNXFeJGOIZgQueskYZKwyn9fJwHfLV7G1jLKdfq';
// binance.options({
//   'APIKEY':APIKEY,
//   'APISECRET':APISECRET
// });
const binance = require('../node-binance-api')().options({
    APIKEY: APIKEY,
    APISECRET: APISECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true // If you want to use sandbox mode where orders are simulated
});

// Get bid/ask prices
//binance.allBookTickers(function(error, json) {
//  console.log("allBookTickers",json);
//});

// Getting latest price of a symbol
// binance.prices(function(error, ticker) {
// 	console.log("prices()", ticker);
// 	console.log("Price of BNB: ", ticker.BTCUSDT);
// });

// Getting list of current balances
binance.balance(function(error, balances) {
	//console.log("balances()", balances);
	if ( typeof balances.BTC !== "undefined" ) {
        console.log("BTC balance: ", balances.BTC.available, balances.BTC.onOrder);
        console.log("USDT balance: ", balances.USDT.available, balances.USDT.onOrder);
	}
});

// Getting bid/ask prices for a symbol
//binance.bookTickers(function(error, ticker) {
//	console.log("bookTickers()", ticker);
//	console.log("Price of BNB: ", ticker.BNBBTC);
//});

// Get market depth for a symbol
//binance.depth("SNMBTC", function(error, json) {
//	console.log("market depth",json);
//});

// Getting list of open orders
//binance.openOrders("ETHBTC", function(error, json) {
//	console.log("openOrders()",json);
//});

// Check an order's status
//let orderid = "7610385";
//binance.orderStatus("ETHBTC", orderid, function(error, json) {
//	console.log("orderStatus()",json);
//});

// Cancel an order
//binance.cancel("ETHBTC", orderid, function(error, response) {
//	console.log("cancel()",response);
//});

// Trade history
//binance.trades("SNMBTC", function(error, json) {
//  console.log("trade history",json);
//});

// Get all account orders; active, canceled, or filled.
//binance.allOrders("ETHBTC", function(error, json) {
//	console.log(json);
//});

//Placing a LIMIT order
//binance.buy(symbol, quantity, price);
//binance.buy("ETHBTC", 1, 0.0679);
//binance.buy('BTCUSDT', 0.01, 8000);

let quantity = 0.01, price = 7000;
binance.sell("BTCUSDT", quantity, price, {type:'LIMIT'}, (error, response) => {
    if ( error ) return console.error(error);
    console.log("Limit Buy response", response);
    console.log("order id: " + response.orderId);
});


//Placing a MARKET order
//binance.buy(symbol, quantity, price, type);
//binance.buy("ETHBTC", 1, 0, "MARKET")
//binance.sell(symbol, quantity, 0, "MARKET");


// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
// binance.candlesticks("BNBBTC", "5m", function(error, ticks) {
// 	console.log("candlesticks()", ticks);
// 	let last_tick = ticks[ticks.length - 1];
// 	let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
// 	console.log("BNBBTC last close: "+close);
// });


// Maintain Market Depth Cache Locally via WebSocket
// binance.websockets.depthCache(["BNBBTC"], function(symbol, depth) {
// 	let max = 10; // Show 10 closest orders only
// 	let bids = binance.sortBids(depth.bids, max);
// 	let asks = binance.sortAsks(depth.asks, max);
// 	console.log(symbol+" depth cache update");
// 	console.log("asks", asks);
// 	console.log("bids", bids);
// 	console.log("ask: "+binance.first(asks));
// 	console.log("bid: "+binance.first(bids));
// });

// binance.exchangeInfo(function(error, data) {
//     let minimums = {};
//     for ( let obj of data.symbols ) {
//         let filters = {minNotional:0.001,minQty:1,maxQty:10000000,stepSize:1,minPrice:0.00000001,maxPrice:100000};
//         for ( let filter of obj.filters ) {
//             if ( filter.filterType === 'MIN_NOTIONAL' ) {
//                 filters.minNotional = filter.minNotional;
//             } else if ( filter.filterType === "PRICE_FILTER" ) {
//                 filters.minPrice = filter.minPrice;
//                 filters.maxPrice = filter.maxPrice;
//             } else if ( filter.filterType === "LOT_SIZE" ) {
//                 filters.minQty = filter.minQty;
//                 filters.maxQty = filter.maxQty;
//                 filters.stepSize = filter.stepSize;
//             }
//         }
//         minimums[obj.symbol] = filters;
//     }
//     console.log(minimums);
//     //fs.writeFile("minimums.json", JSON.stringify(minimums, null, 4), function(err){});
//     global.minimums = minimums; // set global object
// });