const Proyecto = require('../Models/Proyectos_Model')

const obtenerTodosProyectos = async(req, res)=>{
    try {
        const proyectos = await Proyecto.find()
        if(proyectos.length == 0){
            res.status(404).send({
                msg:'No hay proyectos puto',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Obtendidos Correctamente',
                cont: proyectos
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const obtenerProyectosActivos = async(req, res)=>{
    try {
        const proyectos = await Proyecto.find({activo: true})
        if(proyectos.length == 0){
            res.status(404).send({
                msg:'No hay proyectos puto',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Obtendidos Correctamente',
                cont: proyectos
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const crearProyecto = async(req, res)=>{
    try {
        let {nombre, descripcion, presupuestoTotal, manoObra,
        materialesEsperados,tiempoProyectoSemanas,personasCargo,
        areaAsginada} = req.body

        nuevoProyecto = {
            nombre,
            imgProyecto: req.file.path,
            descripcion,
            presupuestoTotal,
            manoObra,
            materialesEsperados,
            tiempoProyectoSemanas,
            personasCargo,
            areaAsginada
        }

        const proyectoAgregado = new Proyecto(nuevoProyecto)
        await proyectoAgregado.save()

        if(!proyectoAgregado){
            res.status(500).send({
                msg:'ocurrio un error vuelva intentar',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Proyecto Creado correctamente',
                cont: proyectoAgregado
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const borrarProyecto = async(req, res)=>{
    try {
        let {id} = req.params

        const proyectoEncontrado = await Proyecto.findById(id)
        if(!proyectoEncontrado){
            res.status(404).send({
                msg: 'No existe tal proyecto',
                cont: 0
            })
        }

        const borrarProyecto = await Proyecto.findByIdAndUpdate(id, {activo: false},{new: true})
        if(!borrarProyecto){
            res.status(500).send({
                msg: 'No ese pudo borrar intente de nuevo',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Proyecto Borrado exitosamente',
                cont: borrarProyecto
            })
        }

    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const obtenerTareasProyecto = async(req, res)=>{
    try {
        let {id} = req.params

        const proyectoEncontrado = await Proyecto.findById(id)
        if(!proyectoEncontrado){
            res.status(404).send({
                msg: 'No existe tal proyecto',
                cont: 0
            })
        }else{
            const tareas = proyectoEncontrado.tareasTotales
            if(tareas.length == 0){
                res.status(204).send({
                    msg: 'No hay tareas por mostrar',
                    cont:0
                })
            }else{
                res.status(200).send({
                    msg: 'Aqui estan las tareas',
                    cont: tareas
                })
            }
        }


    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

module.exports = {
    obtenerTodosProyectos,
    obtenerProyectosActivos,
    crearProyecto,
    borrarProyecto,
    obtenerTareasProyecto
}