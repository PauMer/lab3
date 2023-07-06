const express = require('express');
const routesCarreras = express.Router();
const controller = require('../controllers/carrera.controller');

// Rutas

routesCarreras.get('/carreras', controller.obtenerCarreras);

routesCarreras.get('/carreras/:id', controller.obtenerCarreraPorId);

routesCarreras.post('/carreras', controller.crearCarrera);

routesCarreras.put('/carreras/:id', controller.actualizarCarrera);

routesCarreras.delete('/carreras/:id', controller.eliminarCarrera);

module.exports = routesCarreras;
