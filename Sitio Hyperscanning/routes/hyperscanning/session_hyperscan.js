var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var pool = require('../../models/bd');
var md5 = require('md5');
var sessionhyperscanModel = require('../../models/session_hyperscanModel');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('hyperscanning/session_hyperscan');
});

/*Agregar datos sesion*/
router.get('/session_hyperscan', (req, res, next) => {
  res.render('hyperscanning/session_hyperscan')
});//Cierra render

router.post('/session_hyperscan', async (req, res, next) => {
  try {
    console.log(req.boy)
    if (req.body.observador != "" && req.body.arousal != "" && req.body.recuperacion != "") {
      await sessionhyperscanModel.insertSession(req.body);
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
      error: true,
      message: 'No se cargó la novedad'
    })
  }
})



//hyperscanning form
router.post('/', async (req, res, next) => {

  console.log(req.body)// estoy capturando algo?

  var observador = req.body.observador;
  var fecha_sesion = req.body.fecha_sesion;
  var n_sesion = req.body.n_sesion;
  var fecha_sesion = req.body.fecha_sesion;
  var tipo_sesion = req.body.tipo_sesion;
  var grabacion = req.body.grabacion;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var programa = req.body.programa;
  var email = req.body.email;
  var arousal = req.body.arousal;
  var comentario = req.body.comentario;
  var accion1 = req.body.accion1;
  var indic1 = req.body.indic1;
  var comentario1 = req.body.comentario1;
  var accion2 = req.body.accion2;
  var indic2 = req.body.indic2;
  var comentario2 = req.body.comentario2;
  var reflexion = req.body.reflexion;
  var comentarioref = req.body.comentarioref;
  var accion3 = req.body.accion3;
  var indic3 = req.body.indic3;
  var comentario3 = req.body.comentario3;
  var accion4 = req.body.accion4;
  var indic4 = req.body.indic4;
  var comentario4 = req.body.comentario4;
  var recuperacion = req.body.recuperacion;
  var comentariorecup = req.body.comentariorecup;


  var obj = {
    to: 'diana.lizv@gmail.com',
    subject: 'Informe Hyperscanning - ' + fecha_sesion + ' de ' + nombre + ' ' + apellidos,
    html: ''
  } //Cierre obj variable


  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }); //end transporter

  var info = await transporter.sendMail(obj);

  res.render('session_hyperscan', {
    message: 'Informacion enviada correctamente',
  });//cierra peticion POST

});


module.exports = router;

