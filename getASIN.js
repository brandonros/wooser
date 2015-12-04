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
		  'ResponseGroup': 'Offers,ItemAttributes'
		};

		opHelper.execute('ItemLookup', options, function (err, res) {
			if (err) {
				return reject(err);
			}

			var title = res.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0].Title[0];
			var offerListing = res.ItemLookupResponse.Items[0].Item[0].Offers[0].Offer[0].OfferListing[0];
			var price = offerListing.SalePrice ? offerListing.SalePrice[0].Amount[0] : offerListing.Price[0].Amount[0];
		
		    resolve({
		    	price: parseInt(price) / 100,
		    	name: title
		    });
		});
	});
};