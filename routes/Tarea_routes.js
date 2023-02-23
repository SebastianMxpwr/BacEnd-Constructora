const Tarea_Controller = require('../controllers/Tarea_Controller');
const express = require('express');
const api = express()

api.get('/tareas', Tarea_Controller.obtenerTareas)
api.get('/tareas/:id', Tarea_Controller.obtenerTareaID)
api.post('/crearTarea', Tarea_Controller.crearTarea)
api.put('/actualizar/:id', Tarea_Controller.actualizarTarea)
api.put('/completar/:id', Tarea_Controller.completarTarea)
api.delete('/borrar/:id', Tarea_Controller.borrarTarea)

module.exports = api



