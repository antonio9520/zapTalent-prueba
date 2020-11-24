const mongoose = require("mongoose");

const estudioSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  tipoestudio: {
    type: String,

    trim: true,
  },
  carrera: {
    type: String,

    trim: true,
  },
  institucion: {
    type: String,

    trim: true,
  },
  areaestudio: {
    type: String,

    trim: true,
  },
  diainicio: {
    type: Date,
    default: Date(),
  },
  diafin: {
    type: Date,
    default: Date(),
  },
  escalanotas: {
    type: String,

    trim: true,
  },
  promedio: {
    type: String,

    trim: true,
  },
  pais: {
    type: String,

    trim: true,
  },
  estado: {
    type: String,

    trim: true,
  },
  observacion: {
    type: String,

    trim: true,
  },
  certificado: {
    type: String,
  },
});

module.exports = mongoose.model("Estudio", estudioSchema);
