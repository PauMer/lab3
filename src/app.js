const express = require('express');
const bodyParser = require('body-parser');
const routesApp = require('./routes/app.routes');
const routesUsuarios = require('./routes/usuarios.routes');
const routesProfesores = require('./routes/profesor.routes');
const routesAlumnos = require('./routes/alumno.routes');
const routesMaterias = require('./routes/materia.routes');
const routesCarreras = require('./routes/carrera.routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(routesUsuarios);
app.use(routesProfesores);
app.use(routesAlumnos);
app.use(routesMaterias);
app.use(routesCarreras);
app.use(routesApp);

console.log("servidor corriendo en el puerto:", PORT);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});