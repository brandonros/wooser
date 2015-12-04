module.exports = function (db) {
	return db.schema.createTableIfNotExists('prices', function (table) {
		table.float('price');
		table.string('asin');
		table.timestamp('logged').defaultTo(db.fn.now());
	});
};