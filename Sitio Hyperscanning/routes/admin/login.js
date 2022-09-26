var express = require('express');
var router = express.Router();
var usuariosmodel = require('./../../models/usuariosmodel')

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
router.post('/', async (req, res, next) => {
    try {
        var Usuario = req.body.Usuario;
        var Password = req.body.Password;

        console.log(req.body);

        var data = await usuariosmodel.getUserAndPassword(Usuario, Password);

        if (data != undefined) {
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            })
        } //END IF ELSE
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;
