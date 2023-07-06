const con = require('../db.js');
const mysql = require('mysql');

const controller = {};

// Crear un nuevo alumno
controller.crearAlumno = (req, res) => {
  const { nombre, apellido, fecha_nacimiento, carrera_id } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlInsert = 'INSERT INTO alumno (nombre, apellido, fecha_nacimiento, carrera_id) VALUES (?, ?, ?, ?)';
    const insertQuery = mysql.format(sqlInsert, [nombre, apellido, fecha_nacimiento, carrera_id]);

    connection.query(insertQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Nuevo alumno creado');
      res.sendStatus(201);
    });
  });
};

// Obtener todos los alumnos
controller.obtenerAlumnos = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM alumno';

    connection.query(sqlSelect, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Lista de alumnos obtenida');
      res.send(results);
    });
  });
};

// Obtener un alumno por su ID
controller.obtenerAlumnoPorId = (req, res) => {
  const idAlumno = req.params.id_alumno;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM alumno WHERE id_alumno = ?';
    const selectQuery = mysql.format(sqlSelect, [idAlumno]);

    connection.query(selectQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      if (results.length === 0) {
        console.log('Alumno no encontrado');
        res.sendStatus(404);
      } else {
        console.log('Alumno encontrado');
        res.send(results[0]);
      }
    });
  });
};

// Actualizar un alumno
controller.actualizarAlumno = (req, res) => {
  const idAlumno = req.params.id_alumno;
  const { nombre, apellido, fecha_nacimiento, carrera_id } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlUpdate = 'UPDATE alumno SET nombre = ?, apellido = ?, fecha_nacimiento = ?, carrera_id = ? WHERE id_alumno = ?';
    const updateQuery = mysql.format(sqlUpdate, [nombre, apellido, fecha_nacimiento, carrera_id, idAlumno]);

    connection.query(updateQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Alumno actualizado');
      res.sendStatus(200);
    });
  });
};

// Eliminar un alumno
controller.eliminarAlumno = (req, res) => {
  const idAlumno = req.params.id_alumno;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlDelete = 'DELETE FROM alumno WHERE id_alumno = ?';
    const deleteQuery = mysql.format(sqlDelete, [idAlumno]);

    connection.query(deleteQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Alumno eliminado');
      res.sendStatus(200);
    });
  });
};

module.exports = controller;
