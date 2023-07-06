const con = require('../db.js');
const mysql = require('mysql');

const controller = {};

// Crear una nueva carrera
controller.crearCarrera = (req, res) => {
  const { nombre, duracion } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlInsert = 'INSERT INTO carrera (nombre, duracion) VALUES (?, ?)';
    const insertQuery = mysql.format(sqlInsert, [nombre, duracion]);

    connection.query(insertQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Nueva carrera creada');
      res.sendStatus(201);
    });
  });
};

// Obtener todas las carreras
controller.obtenerCarreras = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM carrera';

    connection.query(sqlSelect, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Lista de carreras obtenida');
      res.send(results);
    });
  });
};

// Obtener una carrera por su ID
controller.obtenerCarreraPorId = (req, res) => {
  const idCarrera = req.params.id;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM carrera WHERE id_carrera = ?';
    const selectQuery = mysql.format(sqlSelect, [idCarrera]);

    connection.query(selectQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      if (results.length === 0) {
        console.log('Carrera no encontrada');
        res.sendStatus(404);
      } else {
        console.log('Carrera encontrada');
        res.send(results[0]);
      }
    });
  });
};

// Actualizar una carrera
controller.actualizarCarrera = (req, res) => {
  const idCarrera = req.params.id_carrera;
  const { nombre, duracion } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlUpdate = 'UPDATE carrera SET nombre = ?, duracion = ? WHERE id_carrera = ?';
    const updateQuery = mysql.format(sqlUpdate, [nombre, duracion, idCarrera]);

    connection.query(updateQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Carrera actualizada');
      res.sendStatus(200);
    });
  });
};

// Eliminar una carrera
controller.eliminarCarrera = (req, res) => {
  const idCarrera = req.params.id_carrera;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlDelete = 'DELETE FROM carrera WHERE id_carrera = ?';
    const deleteQuery = mysql.format(sqlDelete, [idCarrera]);

    connection.query(deleteQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Carrera eliminada');
      res.sendStatus(200);
    });
  });
};

module.exports = controller;
