module.exports = function (db, asin, name, image, price) {
	return db.raw('INSERT OR REPLACE INTO asins(asin, name, image) values (?, ?, ?)', [asin, name, image])
		.then(function () {
			return db.raw('SELECT last_insert_rowid() AS asin_id');
		})
		.then(function (res) {
			return db.insert({ asin_id: res[0].asin_id, price: price }).into('prices');
		});
};