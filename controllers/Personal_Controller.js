const Personal = require('../Models/Personal_Model')
const Area = require('../Models/Area_Model')
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs');
const jwt = require('../helpers/jwt')


const obtenerPersonal = async(req, res) =>{
    try {
        const personalObtenido = await Personal.find()
        if(personalObtenido.length <= 0){
            res.status(404).send({
                msg: 'No hay personal alguno'
            })
        }else{
            res.status(200).send({
                msg: 'Personal Obtenido con exito',
                cont: personalObtenido
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Ocurrio un error interno',
            cont: error.message
        })
    }
}

const obtenerPersonalJefes = async(req, res) =>{
    try {
        const personalObtenido = await Personal.find({tipoEmpleado: 'Jefe' || 'jefe'})
        if(personalObtenido.length <= 0){
            res.status(404).send({
                msg: 'No hay personal alguno o no hay jefes'
            })
        }else{
            res.status(200).send({
                msg: 'Personal Obtenido con exito',
                cont: personalObtenido
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Ocurrio un error interno',
            cont: error.message
        })
    }
}

const obtenerPersonalID = async(req, res) =>{
    try {
        let {id} = req.params

        if(id){
            const personalObtenidoID = await Personal.findById(id)
            if(!personalObtenidoID){
                res.status(404).send({
                    msg:'No existe el usuario o no esta registrado',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg: 'Obtenido el usuario correctamente',
                    cont: personalObtenidoID
                })
            }
        }else{
            res.status(404).send({
                msg: 'No se recibio ningun id, intente de nuevo',
                cont: 0
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Ocurrio un error interno',
            cont: error.message
        })
    }
}

const personalLogin = async(req, res) => {
    try {
        let {body} = req

        const personalObtenido = await Personal.findOne({correo: body.correo})
    
     
        if(!personalObtenido){
            res.status(404).send({
                msg: 'El correo no esta registrado'
            })
        }else{
            bcrypt.compare(body.contrasena, personalObtenido.contrasena, async(err, check)=>{
                if(!check){
                    res.status(400).send({
                        msg: 'la contraseña no es correcta'
                    })
                }
                res.status(200).send({
                    msg: 'Usuario logedo',
                    user: personalObtenido,
                    jwt: jwt.crearToken(personalObtenido)
                })
            })
        }   
    } catch (err) {
        res.status(500).send({
            msg: 'Ocurrio un error interno, intene de nuevo',
            err: err.message
        })
    }

}

const registroPersonal = async(req, res) =>{
    try {
        
    let {nombre, correo,contrasena, numeroTelefono, area, tipoEmpleado} = req.body
    
    const personalDuplicado = await Personal.findOne({correo: correo})

    if(!personalDuplicado){
        console.log(req.body.nombre);
        if(!contrasena){
            res.status(400).send({
                msg: 'No se introdujo una contraseña'
            })
        }else if(contrasena.length<8){
            res.status(400).send({
                msg: 'La contraseña es muy corta'
            })
        }else{
            const nuevoPersonal ={
                nombre,
                correo,
                contrasena,
                numeroTelefono,
                area,
                tipoEmpleado,
                imgPerfil: req.file.path
            } 
            bcrypt.hash(contrasena,null,null, async(req,hash)=>{
                if(hash){
                    nuevoPersonal.contrasena = hash
                    const personalAnadido = new Personal(nuevoPersonal)
                    await personalAnadido.save()
                    const personalAnadidoarea = await Area.findOneAndUpdate({nombre: area}, {$push:{Trabajadores: personalAnadido._id}})
                    if(personalAnadido && personalAnadidoarea){
                        res.status(200).send({
                            msg:'Empleado Creado y agragado',
                            res: {personalAnadido, personalAnadidoarea}
                        })
                        
                    }else if(personalAnadido && !personalAnadidoarea){
                        res.status(202).send({
                            msg:'Empleado Creado pero no agregado',
                            res: {personalAnadido, error: 'ok'}
                        })
                    }else{
                        res.status(500).send({
                            msg:'Ni se creo ni se agrego el puto',
                            res: {error: 'ok'}
                        })
                    }
                }else{
                    res.status(400).send({
                        msg: 'Error del servidor, intente de nuevo'
                    })
                }
            })
        }
    }else{
        res.status(400).send({
            msg: 'Ya esta registrado este email'
        })
    }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg:'Ocurrio un error interno, intene de nuevo',
            err: err.message
        })
    }
}

const actulizarPersonal = async (req, res)=>{
    console.log(req.files);
  

    try {
        let {id} = req.params
        let {nombre, correo, numeroTelefono} = req.body
        if(!id){
            res.status(404).send({
                msg: 'No se recibio un id valido',
                cont: 0
            })
        }else{
            const usuarioEncontrado = await Personal.findById(id)
            if(!usuarioEncontrado){
                res.status(404).send({
                    msg: 'No existe tal usuario',
                    cont: 0
                })
            }else{
                const usuarioPut = {
                    nombre,
                    correo,
                    numeroTelefono,
                    imgPerfil: req.files[0].path,
                    imgPortada: req.files[1].path
                }


                const usuarioActualizado = await Personal.findByIdAndUpdate(id,usuarioPut,{new: true})
                if(!usuarioActualizado){
                    res.status(500).send({
                        msg: 'no se pudo actualizar el usuario, intente de nuevo',
                        cont: 0
                    })
                }else{
                    fs.unlink(usuarioEncontrado.imgPerfil, (err)=>{
                        if(err){
                            console.log(err);
                        }
                        console.log('imagen eliminada');
                    })
                    fs.unlink(usuarioEncontrado.imgPortada, (err)=>{
                        if(err){
                            console.log(err);
                        }
                        console.log('imagen eliminada');
                    })
                    res.status(200).send({
                        msg: 'Exito al actualizar el empleado',
                        cont: usuarioActualizado
                    })
                }
                
            }
        }

    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            cont: error.message
        })
    }
}

const borrarPersonal = async(req, res)=>{
    try {
        let id = req.params.id

    if(id){
        const personalObtenido = await Personal.findById(id)
        if(!personalObtenido){
            res.status(404).send({
                msg:'No existe el usuario o no esta registrado',
                cont: 0
            })
        }else{
            const personalEliminado = await Personal.findByIdAndUpdate(id,{activo: false},{new: true})
            if(!personalEliminado){
                res.status(500).send({
                    msg:'No se pudo eliminar el usuario intente de nuevo',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg:'Usuario eliminado',
                    cont: personalEliminado
                })
            }
        }
    }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            cont: error.message
        })
    }
}

module.exports = {
    obtenerPersonal,
    obtenerPersonalJefes,
    obtenerPersonalID,
    personalLogin,
    registroPersonal,
    actulizarPersonal,
    borrarPersonal
}
