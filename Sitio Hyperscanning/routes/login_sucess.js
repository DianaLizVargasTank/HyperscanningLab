var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('/login_sucess', {
        layout: 'admin/layout',
    });
});

//endsession
router.get('/logout', function (req,res,next) {
    req.session,destroy();
    res.render('admin/login',{
        layout:'admin/layout'
    });
});


module.exports = router;