let mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    senha: { type: Number, required: true }
});