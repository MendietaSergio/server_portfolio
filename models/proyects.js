const { Schema, model } = require('mongoose')

const ProyectsSchema = Schema(
    {
        title: {
            type: String,
            require: [true, 'El nombre del proyecto es obligatorio']
        },
        githubUrl: {
            type: String,
            require: [true, "La URL del GitHub, es obligatorio"]
        },
        deployUrl: {
            type: String,
            require: [true, "La URL del deploy, es obligatorio"]
        },
        titleImg: {
            type: String,
            require: [true, "La URL de la imagen, es obligatorio"]
        },
        type: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)
module.exports = model('Proyects', ProyectsSchema)