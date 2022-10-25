var express = require('express');
var router = express.Router();
var agendaModel = require('../../models/agendaModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


/*listar agenda en hyperscanning*/
router.get('/', async function (req, res, next) {

    //var agenda = await agendaModel.getAgenda();

    var agenda;
    if(req.query.x === undefined) {
        agenda = await agendaModel.getAgenda();
    } else {
        agenda = await agendaModel.buscarAgenda(req.query.x);
    }

    agenda = agenda.map(agenda => {
        if (agenda.test_id) {
            const test_id1 = cloudinary.test_id1(agenda.test_id, {
                width: 80,
                height: 80,
                crop: 'fill'
            });
            return {
                ...agenda,
                test_id1
            }
        } else {
            return {
                ...agenda,
                test_id1: '/images/error- not found.png'
            }
        }
    });



    res.render('hyperscanning/hyperscanlab', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        agenda
        is_search: req.query.x !== undefined,
        x: req.query.x

    });
});

/*para eliminar items de agenda*/
router.get('/eliminar/:Id', async (req, res, next) => {
    var Id = req.params.Id;

    let agenda = await agendaModel.getAgendaById(Id);
    if (agenda.test_id1) {
        await (destroy(agenda.test_id1));
    }


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
        var test_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            test_id1 = req.files.test_id1;
            test_id = (await uploader(test_id1.tempFilePath)).public_id;

        }

        if (req.body.usuario != "" && req.body.fecha_sesion != "" && req.body.n_sesion != "" && req.body.coachee != "" && req.body.programa != "") {
            await agendaModel.insertAgenda({
                ...req.body,
                test_id
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
        let test_id1 = req.body.test_id1_original;
        let borrar_test_id1_viejo = false;

        if (req.body.test_delete === "1") {
            test_id1 = null;
            borrar_test_id1_viejo = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                test_id1 = req.files.test_id1;
                test_id1 = (await uploader(test_id1.tempFilePath)).public_id;
                borrar_test_id1_viejo = true;
            }
        }
        if (borrar_test_id1_viejo && req.body.test_id1_original) {
            await (destroy(req.body.test_id1_original));
        }

        console.log(req.body.Id);
        var obj = {
            usuario: req.body.usuario,
            fecha_sesion: req.body.fecha_sesion,
            n_sesion: req.body.n_sesion,
            coachee: req.body.coachee,
            programa: req.body.programa,
            test_id1
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