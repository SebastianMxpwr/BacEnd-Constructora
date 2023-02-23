const {Schema, model} = require('mongoose')

const areaSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    Trabajadores:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Personal'
        }
    ],
    activo:{
        type:Boolean,
        default:true
    }
})

module.exports = model('Areas', areaSchema)