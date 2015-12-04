module.exports = function (db, asin, price) {
	return db.insert({ asin: asin, price: price }).into('prices');
};