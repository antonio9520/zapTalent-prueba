//import  express  from 'express';
const express = require("express");
const conectarDB = require("./config/db");
const passport = require("passport");
const cors = require("cors");
//Creacion de servidor
const server = express();

//conectar a la bd
conectarDB();
server.use(cors());
//Habiltiar express.json
server.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Login ne general
//Login Face 
server.use(passport.initialize());
// import de rutas Usuario
server.use("/public", express.static(`${__dirname}/storage/usuario`));
server.use("/api/usuarios", require("./routes/usuarios"));
//autenticacion
server.use("/api/auth", require("./routes/auth"));
//import ruta user facebook
server.use('/api/facebooklogin', require('./routes/usuarioface'));
//google login
server.use('/api/googleauth', require('./routes/googlelogin'));
//importar rutas de trabajos
server.use('/api/trabajos', require('./routes/mistrabajos'));
//importar rutas de estudios
server.use('/api/estudios', require('./routes/estudios'));
//importar rutas de certificaciones
server.use('/api/certificacion', require('./routes/certificacion'));
//Importar ruta de AdnSap
server.use('/api/adnsap', require('./routes/adnsap'));
//arrancar app
server.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
