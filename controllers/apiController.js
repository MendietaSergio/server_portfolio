const nodemailer = require("nodemailer");
const Proyects = require("../models/proyects");
const multer = require('multer')
const multerConfig = require('../utils/multerConfig');
const upload = multer(multerConfig).single('images')
exports.fileUpload = (req,res,next) =>{
  upload(req, res, function(error) {
      if(error){
          res.json({message:error});
      }
      return next();//si no hay error sigue la petición.
  })
}
const structureReceiver = (content) => {
  let contenido = `<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de contacto</title>
</head>

<body style="margin: 0;padding: 0;outline: 0;box-sizing: border-box;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; background-color: #F7F8FA; color: black;">
  <div>
    <main>
    <header style="background-color: #0a71c6d1; width: auto;" >
    <div>
      <div style="flex-shrink: 0;
      width: 100%;
      max-width: 100%;
      padding-right: calc(var(--bs-gutter-x) * .5);
      padding-left: calc(var(--bs-gutter-x) * .5);
      margin-top: var(--bs-gutter-y);">
        <nav style="width: 100%;
        padding-right: var(--bs-gutter-x,.75rem);
        padding-left: var(--bs-gutter-x,.75rem);
        margin-right: auto;
        margin-left: auto;">
          <ul style="list-style: none;
          display: inline;">
            <li style="color: #fff;
            font-size: 35px;
            margin: 10px;
            display: inline;
        ">
              <a style="text-decoration: none; color: #C1DBF1;padding: 5px;"
                href="https://www.linkedin.com/in/mendietasergio/"
                target="_blank"
                title="LinkedIn"
              >
                <img style="width: 50px; height: 50px; margin-top: 15px" src="${process.env.IMG_LINKEDIN}" alt="LinkedIn" title="LinkedIn">
              </a>
            </li>
            <li style="color: #fff;
            font-size: 35px;
            margin: 10px;
            display: inline;
        ">
              <a style="text-decoration: none; color: #C1DBF1;padding: 5px;"
                href="https://github.com/MendietaSergio"
                target="_blank"
                title="GitHub"
              >
                <img style="width: 50px; height: 50px; margin-top: 15px" src="${process.env.IMG_GITHUB}" alt="Github" title="GitHub">
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
    </main>
    <article>
      <div style="width: 100%; padding-right: var(--bs-gutter-x,.75rem); padding-left: var(--bs-gutter-x,.75rem); margin-right: auto; margin-left: auto;">
        <div style="flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--bs-gutter-x) * .5);
        padding-left: calc(var(--bs-gutter-x) * .5);
        margin-top: var(--bs-gutter-y);">
        <div style="margin-top: 3rem!important; justify-content: center; display: grid; color: black">
        <h1 style="margin-bottom: 1.5rem!important;">Hola ${content.nombre} !</h1>
        <h4 style="margin-bottom: 1.5rem!important;">Gracias por visitar mi <a style="text-decoration: none; color: #0088ff;padding: 5px;" class="url_portfolio" target="_blank" title="Portafolio" href="https://smendietaportfolio.herokuapp.com/">Portafolio</a> y contactarme :D</h4>
        <span>Este es el formulario que me has enviado:</span>
        <br/>
        <ul style="list-style: none;
        display: inline;">
            <li>Nombre: ${content.nombre}</li>
            <li>Email: ${content.email}</li>
            <li>Asunto: ${content.asunto}</li>
        </ul>
        <h4 style="margin: 1.rem!important;">Mensaje</h4>
        <span>${content.comentario}</span>
      </div>
        </div>
      </div>
    </article>

    <footer style="background-color:#41A4F5; width: 100%; height: 40px; position: absolute; bottom: 0;">
      <div style="width: 100%;
      padding-right: var(--bs-gutter-x,.75rem);
      padding-left: var(--bs-gutter-x,.75rem);
      margin-right: auto;
      margin-left: auto;">
          <div style="flex-shrink: 0;
          width: 100%;
          max-width: 100%;
          padding-right: calc(var(--bs-gutter-x) * .5);
          padding-left: calc(var(--bs-gutter-x) * .5);
          margin-top: var(--bs-gutter-y);">
              <div >
                  <div>
                      <h5 style="text-align: center; font-size: .9rem; padding-top: 10px; color: black;">Plantilla Copyright © Portafolio <a 
                          href="http://linkedin.com/in/mendietasergio" target="_blank" title="Portafolio" style="text-decoration: none; color: black;padding: 5px;"
                          >Mendieta Sergio</a></h5>
                  </div>
              </div>
          </div>
      </div>
  </footer>
  </div>
  </body>
  </html>
`;
  return contenido;
};
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_PORTFOLIO,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = {
  apiForm: (req, res) => {
    const content = req.body;
    const contentHTML = structureReceiver(content);
    let mailOptions = {
      from: req.body.email,
      to: req.body.email + "," + process.env.EMAIL_USER,
      subject: req.body.asunto,
      html: contentHTML,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Mensaje enviado: %s", info.comentario);
      console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    });
    return res.sendStatus(200);
  },
  listProyects: async (req, res) => {
    try {
      const listProyects = await Proyects.find({})
      if (listProyects.length !== 0) {
        console.log("listProyects con datos");
        return res.json({
          ok: "True",
          msg: "Lista de proyectos",
          listProyects
        })
      } else {
        console.log("listProyects sin datos");
        return res.json({
          ok: "True",
          msg: "Lista de proyectos sin datos"
        })
      }
    } catch (error) {
      return res.json({
        ok: false,
        msg: "Falla al enviar la peticion"
      })
    }
  },
  newProyects: async (req, res) => {
    const { title,
      githubUrl,
      deployUrl,
      titleImg,
      type } = req.body
    const newProyects = new Proyects({
      title,
      githubUrl,
      deployUrl,
      titleImg,
      type
    })
    try {

      await newProyects.save()
      res.json({
        ok: true,
        msg: "Proyecto agregado",
        data: newProyects
      })

    } catch (error) {
      return res.json({
        ok: false,
        msg: "Falla al enviar la peticion"
      })
    }
  }
};
