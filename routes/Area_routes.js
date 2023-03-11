const Area_Controller = require('../controllers/Area_Controller')
const express = require('express')
const api = express()

api.get('/area', Area_Controller.obtenerAreas)
api.get('/areaId/:id', Area_Controller.obtenerAreaID)
api.get('/personalArea/:id', Area_Controller.obtenerPersonalArea)
api.post('/agergarArea', Area_Controller.agregarArea)
api.delete('/deleteArea/:id', Area_Controller.borrarArea)

module.exports = api
