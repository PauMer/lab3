const con = require('../db.js');
const mysql = require('mysql');

const controller = {};

// Crear una nueva materia
controller.crearMateria = (req, res) => {
  const { nombre, codigo, carrera_id } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlInsert = 'INSERT INTO materia (nombre, codigo, carrera_id) VALUES (?, ?, ?)';
    const insertQuery = mysql.format(sqlInsert, [nombre, codigo, carrera_id]);

    connection.query(insertQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Nueva materia creada');
      res.sendStatus(201);
    });
  });
};

// Obtener todas las materias
controller.obtenerMaterias = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM materia';

    connection.query(sqlSelect, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Lista de materias obtenida');
      res.send(results);
    });
  });
};

// Obtener una materia por su ID
controller.obtenerMateriaPorId = (req, res) => {
  const idMateria = req.params.id_materia;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM materia WHERE id_materia = ?';
    const selectQuery = mysql.format(sqlSelect, [idMateria]);

    connection.query(selectQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      if (results.length === 0) {
        console.log('Materia no encontrada');
        res.sendStatus(404);
      } else {
        console.log('Materia encontrada');
        res.send(results[0]);
      }
    });
  });
};

// Actualizar una materia
controller.actualizarMateria = (req, res) => {
  const idMateria = req.params.id_materia;
  const { nombre, codigo, carrera_id } = req.body;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlUpdate = 'UPDATE materia SET nombre = ?, codigo = ?, carrera_id = ? WHERE id_materia = ?';
    const updateQuery = mysql.format(sqlUpdate, [nombre, codigo, carrera_id, idMateria]);

    connection.query(updateQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Materia actualizada');
      res.sendStatus(200);
    });
  });
};

// Eliminar una materia
controller.eliminarMateria = (req, res) => {
  const idMateria = req.params.id_materia;

  con.getConnection((err, connection) => {
    if (err) throw err;

    const sqlDelete = 'DELETE FROM materia WHERE id_materia = ?';
    const deleteQuery = mysql.format(sqlDelete, [idMateria]);

    connection.query(deleteQuery, (err, results) => {
      connection.release();
      if (err) throw err;

      console.log('Materia eliminada');
      res.sendStatus(200);
    });
  });
};

module.exports = controller;
