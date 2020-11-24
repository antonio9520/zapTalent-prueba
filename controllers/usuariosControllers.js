const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuarios = async (req, res) => {
  //extraer email y pass
  const { email, password } = req.body;

  try {
    // //Revisar el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    // console.log(req.body);
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El email ya se encuentra registrado" });
    }

    //Crear nuevo usuario
    usuario = new Usuario(req.body);

    //Hasheo de pass
    const salt = await bcryptjs.genSalt(15);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar nuevo usuario
    await usuario.save();

    //Creacion y firma de JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Firma jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};

exports.mostarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findById(req.params.idUsuario);

    if (!usuarios) {
      res.status(400).json({ msg: "Usuario no existe" });
    }

    res.json({ usuarios });
  } catch (error) {
    console.log(error);
  }
};

exports.putUsuario = async (req, res) => {
  const {
    nombres,
    apellidos,
    phone,
    email,
    password,
    ecivil,
    comuna,
    region,
    direccion,
    nacion,
    sexo,
    consultor,
    anosExp,
    anosZap,
    registro,
  } = req.body;
 
  console.log("file-intento");
  try {
    const iduser = req.params.iduser;
    Usuario.findById(iduser, function (err, usuario) {
      if (err) return res.status(404).json({ msg: "Usuario no encontrado" });
      if (nombres) usuario.nombres = nombres;
      if (apellidos) usuario.apellidos = apellidos;
      if (phone) usuario.phone = phone;
      if (email) usuario.email = email;
      if (password) usuario.password = password;
      if (ecivil) usuario.ecivil = ecivil;
      if (comuna) usuario.comuna = comuna;
      if (region) usuario.region = region;
      if (direccion) usuario.direccion = direccion;
      if (nacion) usuario.nacion = nacion;
      if (sexo) usuario.sexo = sexo;
      if (consultor) usuario.consultor = consultor;
      if (anosExp) usuario.anosExp = anosExp;
      if (anosZap) usuario.anosZap = anosZap;
      if (registro) usuario.registro = registro;
      //subida de imagen
      if (req.file) {
        const { filename } = req.file;
        usuario.setImgUrl(filename);
      }
      usuario.save(function (err) {
        if (err)
          return res.status(500).json({ msg: "error al actualizar datos" });
        res.status(200).send(usuario);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en Servidor" });
  }
};
