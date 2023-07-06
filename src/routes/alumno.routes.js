const express = require('express');
const routesAlumnos = express.Router();
const controller = require('../controllers/alumno.controller');

// Rutas

routesAlumnos.get('/alumnos', controller.obtenerAlumnos);

routesAlumnos.get('/alumnos/:id', controller.obtenerAlumnoPorId);

routesAlumnos.post('/alumnos', controller.crearAlumno);

routesAlumnos.put('/alumnos/:id', controller.actualizarAlumno);

routesAlumnos.delete('/alumnos/:id', controller.eliminarAlumno);

module.exports = routesAlumnos;

