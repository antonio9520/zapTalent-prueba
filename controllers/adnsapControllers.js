const Adnsap = require("../models/adnsap");

//CREAR
exports.crearAdnsap = async (req, res) => {
  try {
    const adn = req.body.data;

    for (let i = 0; i < adn.length; i++) {
      const adnsap = new Adnsap({
        name: adn[i].name,
        desc: adn[i].desc,
        submodulos: adn[i].submodulos,
        idcert: adn[i].idcert,
        obs: adn[i].obs,
        iduser: adn[i].iduser,
      });

      adnsap.save();
    }

    res.status(200).json(adn.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarAdnSap = async (req, res) => {
  try {
    const adnsap = await Adnsap.find({ iduser: req.params.iduser });

    res.json(adnsap);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//ELIMINAR
exports.deleteAdnsap = async (req, res) => {
  const idadn = req.params.idadn;
  try {
    Adnsap.findById(idadn, (err, adnsap) => {
      if (err) res.status(402).json({ msg: "Error al borrar AdnZap" });
      adnsap.remove((err) => {
        if (err) res.status(402).json({ msg: "Error al borrar AdnZap" });
        res.status(200).json({ msg: "AdnZap Eliminado Correctamente" });
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//ACTUALIZAR
exports.putAdnsap = async (req, res) => {
  const idadn = req.params.idadn;

  try {
    Adnsap.findById(idadn, function (err, adnsap) {
      if (err) return res.status(404).json({ msg: "Adn no encontrado" });
      adnsap.name = req.body.name;
      adnsap.submodulos = req.body.submodulos;
      adnsap.idcer = req.body.idcer;
      adnsap.obs = req.body.obs;
      adnsap.desc = req.body.desc;

      adnsap.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al Actualizar" });
        res.status(200).send(adnsap);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
