const express = require('express');
const controller = require('../controllers/app.controller.js');

const routesApp = express.Router()

routesApp.get('/', controller.getRutaRaiz);

module.exports = routesApp;