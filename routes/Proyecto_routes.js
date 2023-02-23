const Proyecto_Controller = require('../controllers/Proyecto_Controller')
const express = require('express')
const api = express()
const upload = require('../helpers/multer')

api.get('/proyecto', Proyecto_Controller.obtenerTodosProyectos)
api.get('/proyectoActivo', Proyecto_Controller.obtenerProyectosActivos)
api.get('/tareasProyecto/:id', Proyecto_Controller.obtenerTareasProyecto)
api.post('/crearProyecto', upload.single('image'), Proyecto_Controller.crearProyecto)
api.delete('/borrarProyecto/:id', Proyecto_Controller.borrarProyecto)

module.exports = api
