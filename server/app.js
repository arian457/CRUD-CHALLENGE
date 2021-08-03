const express = require('express')
const morgan = require('morgan')
const homeRoute = require('./routes')
var cors = require('cors')
//inicializaciones

const app = express()

//configuraciones

app.set('port', process.env.PORT || 3001);

//Middlewares

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}))
app.use(express.json())


//Rutas

app.use('/', homeRoute)

module.exports = app

