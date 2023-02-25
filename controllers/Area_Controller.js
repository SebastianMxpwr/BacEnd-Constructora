const Area = require('../Models/Area_Model')

const obtenerAreas = async(req, res) =>{
    try {
        const areasObtenidas = await Area.find()
        if(areasObtenidas.length <= 0){
            res.status(404).send({
                msg: 'No hay Areas algunas'
            })
        }else{
            res.status(200).send({
                msg: 'Areas obtenidas con exito',
                cont: areasObtenidas
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Ocurrio un error interno',
            cont: error.message
        })
    }
}

const obtenerAreaID = async(req, res) =>{
    try {
        let {id} = req.params

        if(id){
            const areaObtenidaId = await Area.findById(id)
            if(!areaObtenidaId){
                res.status(404).send({
                    msg:'No existe el area o no esta registrado',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg: 'Obtenido el area correctamente',
                    cont: areaObtenidaId
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

const obtenerPersonalArea = async(req, res) => {
    try {
        let {id} = req.params

        if(!id){
            res.status(404).send({
                msg:'No se recibio un id '
            })
        }else{
            const areaObtenidaId = await Area.findById(id).populate({
                path: 'Trabajadores',
                match: { activo: true },
            })

            if(!areaObtenidaId){
                res.status(500).send({
                    msg: ' no hay nada',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg: 'obtenidos con exito',
                    cont: areaObtenidaId.Trabajadores
                })
            }

        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            cont: error.message
        })
    }
}

const agregarArea = async(req, res)=>{
    try {
        let {nombre, Trabajadores} = req.body
        
        const areaDuplicada = await Area.find({nombre: nombre})
        if(areaDuplicada.length == 1){
            console.log(areaDuplicada);
            res.status(409).send({
                msg: 'Area existente con este nombre',
                cont: 0
            })
        }else{
            nuevaArea = {
                nombre,
                Trabajadores
            }
            const areaAgregada = await Area.create(nuevaArea)
            areaAgregada.save()

            if(!areaAgregada){
                res.status(500).send({
                    msg: 'No se pudo agregar el area',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg: 'Area agregada',
                    cont: areaAgregada
                })
            }
        }

    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            cont: error.message
        })
    }
}

const borrarArea = async(req, res)=>{
    try {
        let {id} = req.params

    if(id){
        const areaObtenida = await Area.findById(id)
        if(!areaObtenida){
            res.status(404).send({
                msg:'No existe el area o no esta registrado',
                cont: 0
            })
        }else{
            const areaEliminada = await Area.findByIdAndUpdate(id,{activo: false},{new: true})
            if(!areaEliminada){
                res.status(500).send({
                    msg:'No se pudo eliminar el area intente de nuevo',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg:'Usuario eliminado',
                    cont: areaEliminada
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
    obtenerAreas,
    obtenerAreaID,
    borrarArea,
    agregarArea,
    obtenerPersonalArea

}