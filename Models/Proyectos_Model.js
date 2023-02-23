const {Schema, model} = require('mongoose')

const proyectoSchema = new Schema({
    nombre:{
        type:String,
        required:true,
    },
    imgProyecto:{
        type:String
    },
    descripcion:{
        type:String,
        required:true,
    },
    presupuestoTotal:{
        type:Number,
        required:true,
    },
    manoObra:{
        type:Number,
        required:true,
    },
    materialesEsperados:{
        type:Number,
        required:true,
    },
    tiempoProyectoSemanas:{
        type:Number,
        required:true,
    },
    personasCargo:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Personal'
        }
    ],
    areaAsginada:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Area'
    },
    tareasTotales:[{
        nombre:{
            type: String,
            required: true
        },
        prioridad:{
            type:String,
            required:true
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
            default: true
        }
    }],
    activo:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Proyectos', proyectoSchema)