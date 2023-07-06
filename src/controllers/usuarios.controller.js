const con = require('../db.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const generateAccessToken = require('../JWT/generateAccessToken.js')

const controller = {};

controller.agregarUsuarios = async (req, res) => {
    const usuario = req.body.nombre_usuario;
    const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);

    con.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = 'SELECT * FROM usuario WHERE nombre_usuario = ?';
        const searchQuery = mysql.format(sqlSearch, [usuario]);
        const sqlInsert = 'INSERT INTO usuario (nombre_usuario, contraseña) VALUES ( ?, ?)';
        const insertQuery = mysql.format(sqlInsert, [usuario, hashedPassword]);

        await connection.query(searchQuery, async (err, results) => {
            if (err) throw err;
            console.log("---------> buscando resultados");
            console.log(results.length);
            if(results.length != 0){
                connection.release();
                console.log("-----------> usuario existente");
                res.sendStatus(409);
            }else{
                await connection.query(insertQuery, (err, results) =>{
                    connection.release();
                    if(err) throw err;
                    console.log("-------> nuevo usuario insertado");
                    console.log(results.insertId);
                    res.sendStatus(201);
                })
            }
        })
    })
};

controller.autenticarUsuario = (req, res) => {
    const usuario = req.body.nombre_usuario;
    const password = req.body.contraseña;
  
    con.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = 'SELECT * FROM usuario WHERE nombre_usuario = ?';
      const searchQuery = mysql.format(sqlSearch, [usuario]);
  
      await connection.query(searchQuery, async (err, results) => {
        connection.release();
        if (err) throw err;
        if (results.length === 0) {
          console.log('--------> usuario no existe');
          res.sendStatus(404);
        } else {
          const hashedPassword = results[0].contraseña;
          if (await bcrypt.compare(password, hashedPassword)) {
            console.log('--------> Loggin Succesfull');
            console.log('generate accessToken');
            const token = generateAccessToken({ user: usuario });
            console.log(token);
            res.json({ accessToken: token });
          } else {
            res.send('Contraseña incorrecta');
          }
        }
      });
    });
  };

  
  // Obtener todos los usuarios
  controller.obtenerUsuarios = (req, res) => {
    con.getConnection((err, connection) => {
      if (err) throw err;
  
      const sqlSelect = 'SELECT * FROM usuario';
  
      connection.query(sqlSelect, (err, results) => {
        connection.release();
        if (err) throw err;
  
        console.log('Lista de usuarios obtenida');
        res.send(results);
      });
    });
  };
  
  // Obtener un usuario por su ID
  controller.obtenerUsuarioPorId = (req, res) => {
    const idUsuario = req.params.id_usuario;
  
    con.getConnection((err, connection) => {
      if (err) throw err;
  
      const sqlSelect = 'SELECT * FROM usuario WHERE id_usuario = ?';
      const selectQuery = mysql.format(sqlSelect, [idUsuario]);
  
      connection.query(selectQuery, (err, results) => {
        connection.release();
        if (err) throw err;
  
        if (results.length === 0) {
          console.log('Usuario no encontrado');
          res.sendStatus(404);
        } else {
          console.log('Usuario encontrado');
          res.send(results[0]);
        }
      });
    });
  };
  
  // Actualizar un usuario
  controller.actualizarUsuario = (req, res) => {
    const idUsuario = req.params.id_usuario;
    const { nombre_usuario, contraseña } = req.body;
  
    con.getConnection(async (err, connection) => {
      if (err) throw err;
  
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      const sqlUpdate = 'UPDATE usuario SET nombre_usuario = ?, contraseña = ? WHERE id_usuario = ?';
      const updateQuery = mysql.format(sqlUpdate, [nombre_usuario, hashedPassword, idUsuario]);
  
      connection.query(updateQuery, (err, results) => {
        connection.release();
        if (err) throw err;
  
        console.log('Usuario actualizado');
        res.sendStatus(200);
      });
    });
  };
  
  // Eliminar un usuario
  controller.eliminarUsuario = (req, res) => {
    const idUsuario = req.params.id_usuario;
  
    con.getConnection((err, connection) => {
      if (err) throw err;
  
      const sqlDelete = 'DELETE FROM usuario WHERE id_usuario = ?';
      const deleteQuery = mysql.format(sqlDelete, [idUsuario]);

      connection.query(deleteQuery, (err, results) => {
        connection.release();
        if (err) throw err;
  
        console.log('Usuario eliminado');
        res.sendStatus(200);
      });
    });
  };

module.exports = controller;
