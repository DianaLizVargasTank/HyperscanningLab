var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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
