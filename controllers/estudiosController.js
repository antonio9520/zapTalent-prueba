const Estudio = require("../models/estudios");

//GUARDAR
exports.crearEstudios = async (req, res) => {
  try {
    //Crear nuevo Estudio
    estudio = new Estudio(req.body);

    //Guardar nuevo estudio
    await estudio.save();
    res.json(estudio);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarEstudio = async (req, res) => {
  try {
    const estudios = await Estudio.find({ idusuario: req.params.idusuario });
    res.json(estudios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ACTUALIZAR
exports.putestudio = async (req, res) => {
  const idestudio = req.params.idestudio;
  try {
    Estudio.findById(idestudio, function (err, estudio) {
      if (err) return res.status(500).json({ msg: "Error al actualizar." });
      estudio.tipoestudio = req.body.tipoestudio;
      estudio.carrera = req.body.carrera;
      estudio.institucion = req.body.institucion;
      estudio.areaestudio = req.body.areaestudio;
      estudio.escalanotas = req.body.escalanotas;
      estudio.promedio = req.body.promedio;
      estudio.pais = req.body.pais;
      estudio.estado = req.body.estado;
      estudio.observacion = req.body.observacion;
      estudio.certificado = req.body.certificado;
      estudio.diainicio = req.body.diainicio;
      estudio.diafin = req.body.diafin;

      estudio.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al actualizar." });
        res.status(200).send(estudio);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ELIMINAR
exports.deleteestudio = async (req, res) => {
  const idestudio = req.params.idestudio;
  try {
    Estudio.findById(idestudio, (err, estudio) => {
      if (err) res.status(402).json({ msg: `Error al borrar estudio` });
      estudio.remove((err) => {
        if (err) res.status(402).json({ msg: `Error al borrar estudio` });
        res.status(200).json({ msg: "Estudio Eliminado Exitosamente" });
      });
    });
  } catch (error) {
    res.status(404).json({ msg: "Error en el servidor." });
  }
};
