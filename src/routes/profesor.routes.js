const express = require('express');
const routesProfesores = express.Router();
const controller = require('../controllers/profesor.controller');

// Rutas

routesProfesores.get('/profesores', controller.obtenerProfesores);

routesProfesores.get('/profesores/:id', controller.obtenerProfesorPorId);

routesProfesores.post('/profesores', controller.crearProfesor);

routesProfesores.put('/profesores/:id', controller.actualizarProfesor);

routesProfesores.delete('/profesores/:id', controller.eliminarProfesor);

module.exports = routesProfesores;
