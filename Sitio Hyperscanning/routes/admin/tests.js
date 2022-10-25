var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;

router.get('/', async function (req, res, next) {
    var agenda = await agendaModel.getAgenda();
    hyperscanlab = hyperscanlab.splice (0,5)
    hyperscanlab = hyperscanlab.map(agenda => {
        if (agenda.test_id1) {
            const test_id1 = cloudinary.test_id1(agenda.test_id1, {
                width: 80,
                height: 90,
                crop: 'fill'
            });
            return {
                ...agenda,
                test_id1
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }
        }
    })



    res.render('hyperscanning/hyperscanlab', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        agenda

    });
});

router.get('/', function (req, res, next) {
    res.render('tests');
});

//endsession
router.get('/logout', function (req,res,next) {
    req.session,destroy();
    res.render('tests');
});


module.exports = router;