var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var usuariosModel = require('./../models/usuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//endsession
router.get('/logout', function (req,res,next) {
  req.session,destroy();
  res.render('index');
});

//login
router.post('/', async (req, res, next) => {
  try {
      var usuario = req.body.usuario;
      var password = req.body.password;

      console.log(req.body);

      var data = await usuariosModel.getUserAndPassword(usuario, password);

      if (data != undefined) {
          req.session.id_usuario = data.id; 
          req.session.nombre = data.usuario;
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


//formulario
router.post('/', async (req, res, next) => {

  console.log(req.body)// estoy capturando algo?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var mail = req.body.mail;
  var telefono = req.body.tel;
  var asunto = req.body.asunto;
  var mensaje = req.body.mensaje;


  var obj = {
    to: 'diana.lizv@gmail.com',
    subject: 'Contacto desde la web momentum_lab',
    html: nombre + " " + apellido + " nos envió un mensaje con remitente al email " + mail + " con el asunto de " + asunto + ". <br> Agregó el siguiente mensaje: " + mensaje + ". <br> Núméro de contacto es el " + telefono
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

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  });//cierra peticion POST

});

module.exports = router;
