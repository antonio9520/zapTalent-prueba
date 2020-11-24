const Certificacion = require("../models/certificacion");

//GUARDAR
exports.crearCertificacion = async (req, res) => {
  try {
    //Crear nueva certificacion
    certificado = new Certificacion(req.body);
    //Guardar Certificacion
    await certificado.save();
    res.json(certificado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarCertificacion = async (req, res) => {
  try {
    const certificado = await Certificacion.find({
      idusuario: req.params.idusuario,
    });
    res.json(certificado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ACTUALIZAR
exports.putCertificacion = async (req, res) => {
  const idcertificacion = req.params.idcertificacion;
  try {
    Certificacion.findById(idcertificacion, function (err, certificacion) {
      certificacion.certificacion = req.body.certificacion;
      certificacion.universidad = req.body.universidad;
      certificacion.fecha = req.body.fecha;
      certificacion.pais = req.body.pais;
      certificacion.estado = req.body.estado;
      certificacion.obs = req.body.obs;
      certificacion.certificado = req.body.certificado;

      if (err)
        return res.status(404).json({ msg: "Certificado no encontrado" });
      certificacion.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al actualizar." });
        res.status(200).send(certificacion);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ELIMINAR
exports.deleteCertificacion = async (req, res) => {
  const certifiid = req.params.idcertificacion;
  try {
    Certificacion.findById(certifiid, (err, certificacion) => {
      if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
      certificacion.remove((err) => {
        if (err) res.status(402).send({ msg: "Error al borrar certificado" });
        res.status(200).send({ msg: "Certificado eliminado exitosamente." });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor." });
  }
};
