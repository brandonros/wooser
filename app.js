var asins = require('./asins');

var db = require('./db');
var initDB = require('./initDB');

var processASIN = require('./processASIN');

var queue = require('./queue')(5000, function (asin) {
	return processASIN(db, asin);
});

initDB(db)
.then(function () {
	asins.forEach(queue.add);

	queue.on('drain', function () {
		asins.forEach(queue.add);
	});
});