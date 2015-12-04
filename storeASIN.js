module.exports = function (db, asin, name, price) {
	return db.raw('INSERT OR REPLACE INTO asins(asin, name) values (?, ?)', [asin, name])
		.then(function () {
			return db.raw('SELECT last_insert_rowid() AS id');
		})
		.then(function (res) {
			var id = res[0].id;

			return db.insert({ asin_id: id, price: price }).into('prices');
		});
};