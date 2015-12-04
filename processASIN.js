var getASIN = require('./getASIN');
var storeASIN = require('./storeASIN');

module.exports = function (db, asin) {
	return getASIN(asin)
		.then(function (res) {
			console.log(new Date(), res.name, res.price);
			
			return storeASIN(db, asin, res.name, res.image, res.price);
		});
};