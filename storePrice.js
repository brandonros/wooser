var db = require('./db');

module.exports = function (asin, price) {
	return db.insert({ asin: asin, price: price }).into('prices');
};