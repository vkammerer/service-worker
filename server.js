var express = require('express');
var serveStatic = require('serve-static');
var url = require('url');
var gcm = require('node-gcm');
 
var app = express();

/*
	STATIC
*/

app.use(serveStatic('./public/'));

/*
	API (sends push notifications)
*/

var GCM_API_KEY = process.env.GCM_API_KEY;
var sender = new gcm.Sender(GCM_API_KEY);
var message = new gcm.Message();

app.get(/\/api.*/, function (req, res) {

	var query = url.parse(req.url, true).query;

	sender.send(message, query.subscriptionId, 10, function (err, result) {
		if(err) {
			console.error(err);
			res.sendStatus(404);
		}
		else {
			console.log(result);
			res.sendStatus(200);
		}
	});

});

app.listen(process.env.PORT || 3000);
