const {Schema, model} = require('mongoose')

const personalSchema = new Schema({
    nombre:{
        type:String,
        required:true
    }, 
    correo:{
        type:String,
        required:true
    },
    contrasena:{
        type:String,
        required: true
    },
    numeroTelefono:{
        type:Number,
        required:true
    },
    area: {
        type:String,
        // required:true
    },
    imgPerfil:{
        type:String,
    },
    imgPortada:{
        type:String,
    },
    tipoEmpleado: {
        type:String,
        required:true,
        default: 'normal'
    },
    tareas: [
       {
        type: Schema.Types.ObjectId,
        ref: 'Tarea'
    }
    ],
    activo:{
        type:Boolean,
        default: true
    }
    
})

module.exports = model('Personal', personalSchema)