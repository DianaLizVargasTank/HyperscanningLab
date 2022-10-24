var express = require('express');
var router = express.Router();
var agendaModel = require('./../../models/agendaModel');

router.get('/', async function (req, res, next) {
    var agenda = await agendaModel.getAgenda();
    res.render('admin/novedades', {
        usuario: req.session.nombre,
        agenda,
        layout: 'admin/layout'
    });
});
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await agendaModel.deleteAgendaById(Id);
    res.redirect('/admin/novedades')


});

//endsession
router.get('/logout', function (req, res, next) {
    req.session, destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
//cierra get

//para agregar nueva sesión
router.get('/session_hyperscan', (req, res, next) => {
    res.render('/hyperscanning/session_hyperscan')
});//cierra agregar

router.post('/session_hyperscan', async (req, res, next) => {
    try {
        console.log(re.body)
        if (req.body.observador != "" && req.body____ != "" && req.body.___ != "" && ______) {
            await session_hyperscanModel.insertSession(re.body);
            res.redirect('/login_sucess')
        } else {
            res.render('hyperscanning/session_hyperscan', {
                error: true,
                message: ' Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('hyperscanning/session_hyperscan', {
            layout: 'admin/layout',
            error: true,
            message: ' No se cargo la información'
        })
    }
})


router.get('/modificar/:observador', async (req, res, next) => {
    var observador = req.params.observador;
    var session = await session_hyperscan.getSessionByObservador(observador);
    res, render('/hyperscanning/modificar', {
        layout: 'admin/layout',
        session
    });
});



module.exports = router;