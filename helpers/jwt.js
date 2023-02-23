const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'ConstructoraPro'

exports.crearToken = (user)=>{
    const payload = {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        tipoEmpleado: user.tipoEmpleado,
        iat: moment().unix(),
        expiresIn: moment().add(1,'days').unix()
    }

return jwt.encode(payload,secret)
}