require('./config/config')
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path')

const area_routes = require('./routes/Area_routes')
const personal_routes = require('./routes/Personal_routes')
const proyecto_routes = require('./routes/Proyecto_routes')
const tarea_routes = require('./routes/Tarea_routes')

const app = express();

const bodyParserJson = body_parser.json();
const bodyParserUrlEncode = body_parser.urlencoded({extended:true})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParserUrlEncode)
app.use(bodyParserJson)

app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', area_routes);
app.use('/api', personal_routes);
app.use('/api', proyecto_routes);
app.use('/api', tarea_routes);


mongoose.connect(process.env.URLBD,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if (err) throw err
    console.log(`Base de datos online en: ${process.env.URLBD}`)
})

app.listen(process.env.PORT,()=>{
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})