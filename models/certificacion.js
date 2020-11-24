const mongoose = require("mongoose");

const certificacionSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  certificacion: {
    type: String,
    require: true,
    trim: true,
  },
  universidad: {
    type: String,
    require: true,
    trim: true,
  },  
  fecha: {
    type: Date,
    default: Date(),
  },
  pais: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: String,
    require: true,
    trim: true,
  },
  obs: {
    type: String,
    trim: true,
  },
  certificado: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Certificacion", certificacionSchema);
