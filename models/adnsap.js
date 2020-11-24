const mongoose = require("mongoose");

const adnsapSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  submodulos: [
    {
      name: String,
      nivel: String,
      obs: String,
      desc: String,
    },
  ],
  idcert: {
    type: String,
    trim: true,
  },
  obs: {
    type: String,
    trim: true,
  },
  certificadoURL: {
    type: String,
    trim: true,
  },
  iduser: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Adnsap", adnsapSchema);
