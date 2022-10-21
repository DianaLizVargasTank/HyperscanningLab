var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('tests');
});

//endsession
router.get('/logout', function (req,res,next) {
    req.session,destroy();
    res.render('tests');
});


module.exports = router;