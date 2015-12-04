var OperationHelper = require('apac').OperationHelper;

var config = require('./config');

var opHelper = new OperationHelper({
	awsId: config.awsId,
	awsSecret: config.awsSecret,
	assocId: 'node.js',
	version: '2013-08-01'
});

module.exports = function (asin) {
	return new Promise(function (resolve, reject) {
		var options = {
		  'IdType': 'ASIN',
		  'ItemId': asin,
		  'ResponseGroup': 'Offers'
		};

		opHelper.execute('ItemLookup', options, function (err, res) {
			if (err) {
				return reject(err);
			}

		    resolve(parseInt(res.ItemLookupResponse.Items[0].Item[0].OfferSummary[0].LowestNewPrice[0].Amount[0]) / 100);
		});
	});
};