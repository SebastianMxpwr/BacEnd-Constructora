const {Schema, model} = require('mongoose')

const tareaSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    prioridad:{
        type:String,
        required:true
    },
    proyecto:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Proyectos'
    },
    area:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Area'
    },
    personaAsginada:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Personal'
    },
    semanasEsperadas:{
        type: Number,
        default: 1,
        required: true
    },
    fechaLimite:{
        type: Date
    },
    detalles:{
        type: String
    },
    adjuntos:[
        String
    ],
    completada:{
        type:Boolean,
        default: false
    },
    activo:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Tarea', tareaSchema)