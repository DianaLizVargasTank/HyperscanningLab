var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('/login_sucess', {
        layout: 'admin/layout',
        observador: req.session.nombre
    });
});

module.exports = router;