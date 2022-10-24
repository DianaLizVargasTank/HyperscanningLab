var express = require('express');
var router = express.Router();
var agendaModel = require('../../models/agendaModel');

router.get('/', async function (req, res, next) {
    var agenda = await agendaModel.getAgenda();
    res.render('hyperscanning/hyperscanlab', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        agenda

    });
});

/*para eliminar items de agenda*/
router.get('/eliminar/:Id', async (req, res, next) => {
    var id = req.params.Id;
    await agendaModel.deleteAgendaById(Id);
    res.redirect('/hyperscanning/hyperscanlab')
});
//end eliminar

/*para agendar item en agenda*/
router.get('/agendar', (req, res, next) => {
    res.render('hyperscanning/agendar', {
        layout: 'admin/layout'
    });
});

router.post('/agendar', async (req, res, next) => {
    try {
        console.log(req.body)
        if (req.body.usuario != "" && req.body.fecha_sesion != "" && req.body.n_sesion != "" && req.body.coachee != "" && req.body.programa != "") {
            await agendaModel.insertAgenda(req.body);
            res.redirect('/hyperscanning/hyperscanlab')
        } else {
            res.render('hyperscanning/agendar', {
                layout: 'admin/layout',
                error: true,
                message: ' Todos los campos son obligatorios'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('hyperscanning/agendar', {
            layout: 'admin/layout',
            error: true,
            message: ' No se agendó la sesión'
        });
    }
});

//end agendar

/*modificar agenda*/
router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var agenda = await agendaModel.getAgendaById(Id);
    res.render('hyperscanning/modificar', {
        layout: 'admin/layout',
        agenda
    });
});

router.post('/modificar',async(req,res,next) => {
    try {
        let obj ={
            usuario:req.body.usuario,
            fecha_sesion: req.body.fecha_sesion,
            n_sesion: req.body.n_sesion,
            coachee: req.body.coachee,
            programa: req.body.programa
        }
        await agendaModel.modificarAgendaById(obj, req.body.Id);
        res.redirect('/hyperscanning/hyperscanlab');
    }
    catch (error) {
        console.log(error)
        res.render('hyperscanning/modificar', {
            layout: 'admin/layout',
            error:true,
            message: ' No se modificó la novedad'
        })
    }
})

//endsession
router.get('/logout', function (req, res, next) {
    req.session, destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
//cierra get

module.exports = router;