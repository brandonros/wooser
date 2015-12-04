var getPrice = require('./getPrice');
var storePrice = require('./storePrice');

module.exports = function (db, asin) {
	return getPrice(asin)
		.then(function (price) {
			return storePrice(db, asin, price);
		});
};