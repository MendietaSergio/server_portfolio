
let whiteList = [process.env.URL_PORTFOLIO]


let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1) {
            callback(null, true);
        } else {
            callback(new Error('Error al acceder.'))
        }
    }
}

module.export = corsOptions;