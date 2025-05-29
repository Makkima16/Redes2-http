const mongoose = require('mongoose');

// Nuevo schema para guardar visitas por IP
const visitSchema = new mongoose.Schema({
  // Guardaremos la IP como un identificador único
  ipAddress: {
    type: String,
    required: true,
    unique: true // Nos aseguramos de que no haya IPs duplicadas
  },
  // El contador de visitas para esa IP específica
  visitCount: {
    type: Number,
    default: 1 // Empezará en 1 en la primera visita
  }
});

module.exports = mongoose.model('Visit', visitSchema);