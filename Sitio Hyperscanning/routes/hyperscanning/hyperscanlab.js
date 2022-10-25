var express = require('express');
var router = express.Router();
var agendaModel = require('../../models/agendaModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);


/*listar agenda en hyperscanning*/
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
    var Id = req.params.Id;
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
        //console.log(req.body)
        var test_id1 = '';
        var test_id2 = '';
        if (req.files && Object.keys(req.files).length > 0) {
            test_id1 = req.files.test_id1,
                test_id2 = req.files.test_id2,
                test_id1 = (await uploader(test_id1.tempFilePath)).public_id;
            test_id2 = (await uploader(test_id2.tempFilePath)).public_id;
        }

        if (req.body.usuario != "" && req.body.fecha_sesion != "" && req.body.n_sesion != "" && req.body.coachee != "" && req.body.programa != "") {
            await agendaModel.insertAgenda({
                ...req.body,
                test_id1,
                test_id2
            });
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
            message: 'No se agendó la sesión'
        });
    }
});

//end agendar

/*modificar agenda*/
router.get('/modificar/:Id', async (req, res, next) => {
    var Id = req.params.Id;
    var agenda = await agendaModel.getAgendaById(Id);
    res.render('hyperscanning/modificar', {
        layout: 'admin/layout',
        agenda
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        console.log(req.body.Id);
        var obj = {
            usuario: req.body.usuario,
            fecha_sesion: req.body.fecha_sesion,
            n_sesion: req.body.n_sesion,
            coachee: req.body.coachee,
            programa: req.body.programa
        }
        console.log(obj);
        await agendaModel.modificarAgendaById(obj, req.body.Id);
        res.redirect('/hyperscanning/hyperscanlab');
    }
    catch (error) {
        console.log(error)
        res.render('hyperscanning/modificar', {
            layout: 'admin/layout',
            error: true,
            message: ' No se modificó la novedad'
        })
    }
});

//endsession
router.get('/logout', function (req, res, next) {
    req.session, destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
//cierra get

module.exports = router;