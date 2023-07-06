const express = require('express');
const routesMaterias = express.Router();
const controller = require('../controllers/materia.controller');

// Rutas

routesMaterias.get('/materias', controller.obtenerMaterias);

routesMaterias.get('/materias/:id', controller.obtenerMateriaPorId);

routesMaterias.post('/materias', controller.crearMateria);

routesMaterias.put('/materias/:id', controller.actualizarMateria);

routesMaterias.delete('/materias/:id', controller.eliminarMateria);

module.exports = routesMaterias;
