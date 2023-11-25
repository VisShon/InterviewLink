var express = require('express');
var router = express.Router();



router.post('/ocrAPI', function(req, res, next) {
	//for bulk upload
});

router.post('/schedulerAPI', function(req, res, next) {
	//for single person scheduling
	//restrict to once per 1 minute
});

router.get('/schedulerAPI', function(req, res, next) {
	//for bulk scheduling
	//restrict to once when process starts
});

module.exports = router;
