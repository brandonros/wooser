var asins = require('./asins');

var processASIN = require('./processASIN');

var queue = require('./queue')(5000, processASIN);

asins.forEach(queue.add);

queue.on('drain', function () {
	asins.forEach(queue.add);
});