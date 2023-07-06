const express = require('express');
const routesUsuarios = express.Router();
const controller = require('../controllers/usuarios.controller');

// Rutas

routesUsuarios.post('/usuarios', controller.agregarUsuarios);

routesUsuarios.post('/usuarios/autenticar', controller.autenticarUsuario);

routesUsuarios.get('/usuarios', controller.obtenerUsuarios);

routesUsuarios.get('/usuarios/:id', controller.obtenerUsuarioPorId);

routesUsuarios.put('/usuarios/:id', controller.actualizarUsuario);

routesUsuarios.delete('/usuarios/:id', controller.eliminarUsuario);

module.exports = routesUsuarios;
