module.exports = function (db) {
	return db.schema.createTable('prices', function (table) {
		table.float('price');
		table.string('asin');
		table.timestamp('logged').defaultTo(db.fn.now());
	});
};