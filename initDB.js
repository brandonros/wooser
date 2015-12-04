module.exports = function (db) {
	return db.schema.createTableIfNotExists('asins', function (table) {
		table.increments('id');
		table.string('asin').unique().index();
		table.string('name').index();
		table.string('image');
	})
	.then(function () {
		return db.schema.createTableIfNotExists('prices', function (table) {
			table.float('price');
			table.integer('asin_id').unsigned().references('id').inTable('asins');
			table.timestamp('logged').defaultTo(db.fn.now());
		});
	});
};