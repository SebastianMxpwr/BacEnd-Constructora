const Personal_Controller = require('../controllers/Personal_Controller')
const express = require('express')
const api = express()
const upload = require('../helpers/multer')


api.get('/allPersonal', Personal_Controller.obtenerPersonal)
api.get('/allPersonalJefes', Personal_Controller.obtenerPersonalJefes)
api.get('/PersonalId/:id', Personal_Controller.obtenerPersonalID)
api.post('/login', Personal_Controller.personalLogin)
api.post('/addPersonal', Personal_Controller.registroPersonal)
api.delete('/deletePersonal/:id', Personal_Controller.borrarPersonal)

module.exports = api

