var Promise = require('bluebird');
var EventEmiter = require('events');

module.exports = function (jobDelay, cb) {
	var jobs = [];

	var queue = new EventEmiter();

	queue.add = function (job) {
		jobs.push(job);

		if (jobs.length === 1) {
			queue.process();
		}
	};

	queue.process = function () {
		return Promise.delay(jobDelay)
			.then(function () {
				return cb(jobs.shift());
			})
			.then(function (res) {
				if (jobs.length) {
					return queue.process();
				}

				queue.emit('drain');
			});
	};

	return queue;
};