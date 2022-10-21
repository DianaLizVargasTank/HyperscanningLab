var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('metodologia');
});

//endsession
router.get('/logout', function (req,res,next) {
    req.session,destroy();
    res.render('metodologia');
});


module.exports = router;