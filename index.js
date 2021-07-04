const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let whiteList = ['https://smendietaportfolio.herokuapp.com']

let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1) {
            callback(null, true);
        } else {
            callback(new Error('Error al acceder.'))
        }
    }
}
app.get('/', (req, res) => {
    res.send("Server para envios de email");
});

app.post("/api/form", cors(corsOptions), (req, res) => {
    const contentHTML = `
        <h3>Email enviado desde React</h3>
        <ul>
            <li>Nombre: ${req.body.nombre}</li>
            <li>Email: ${req.body.email}</li>
            <li>Asunto: ${req.body.asunto}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${req.body.comentario}</p>`
    console.log(contentHTML);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from: req.body.email,
        to: req.body.email,
        subject: req.body.asunto,
        html: contentHTML
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("estoy en err");
            return console.log(err);
        }
        console.log("Mensaje enviado: %s", info.comentario);
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    })
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    return res.sendStatus(200);

})
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
})