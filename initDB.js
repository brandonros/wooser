var db = require('./db');

module.exports = function () {
	db.schema.createTable('prices', function (table) {
	  table.float('price');
	  table.string('asin');
	  table.timestamp('logged').defaultTo(knex.fn.now());
	});
};