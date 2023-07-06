const con = require('../db.js');
const mysql = require('mysql');

const controller = {};

// Crear un nuevo profesor
controller.crearProfesor = (req, res) => {
  const { nombre, apellido, especialidad } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlInsert = 'INSERT INTO profesor (nombre, apellido, especialidad) VALUES (?, ?, ?)';
    const insertQuery = mysql.format(sqlInsert, [nombre, apellido, especialidad]);

    connection.query(insertQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Nuevo profesor creado');
      res.sendStatus(201);
    });
  });
};

// Obtener todos los profesores
controller.obtenerProfesores = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM profesor';

    connection.query(sqlSelect, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Lista de profesores obtenida');
      res.send(results);
    });
  });
};

// Obtener un profesor por su ID
controller.obtenerProfesorPorId = (req, res) => {
  const idProfesor = req.params.id_profesor;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM profesor WHERE id_profesor = ?';
    const selectQuery = mysql.format(sqlSelect, [idProfesor]);

    connection.query(selectQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      if (results.length === 0) {
        console.log('Profesor no encontrado');
        res.sendStatus(404);
      } else {
        console.log('Profesor encontrado');
        res.send(results[0]);
      }
    });
  });
};

// Actualizar un profesor
controller.actualizarProfesor = (req, res) => {
  const idProfesor = req.params.id_profesor;
  const { nombre, apellido, especialidad } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlUpdate = 'UPDATE profesor SET nombre = ?, apellido = ?, especialidad = ? WHERE id_profesor = ?';
    const updateQuery = mysql.format(sqlUpdate, [nombre, apellido, especialidad, idProfesor]);


    connection.query(updateQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Profesor actualizado');
      res.sendStatus(200);
    });
  });
};

// Eliminar un profesor
controller.eliminarProfesor = (req, res) => {
  const idProfesor = req.params.id_profesor;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlDelete = 'DELETE FROM profesor WHERE id_profesor = ?';
    const deleteQuery = mysql.format(sqlDelete, [idProfesor]);

    connection.query(deleteQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Profesor eliminado');
      res.sendStatus(200);
    });
  });
};

module.exports = controller;
