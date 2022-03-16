const multer = require('multer');
const shortid = require('shortid');

//defino objeto
const multerConfig = {
    storage: fileStorage = multer.diskStorage({
        //destino donde se guardan
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/'); // los uploads se subirán en esta carpeta
        },
        //nombre asignado con shorid mas la extencion.
        filename: (req, file, cb) => {
            // obtener la extensión del archivo
            const extension = file.mimetype.split('/')[1];
            // generar ID para ponerlo como nombre de imagen
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    //filtro para aceptar formato de imagen
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { // solo aceptar imágenes
            cb(null, true);
        } else {
            cb(('Formato de imagen no válido'))
        }
    },
}

module.exports = multerConfig;