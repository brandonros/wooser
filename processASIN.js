var db = require('./db');

var getPrice = require('./getPrice');
var storePrice = require('./storePrice');

module.exports = function (asin) {
	return getPrice(asin)
		.then(function (price) {
			return storePrice(asin, price);
		});
};