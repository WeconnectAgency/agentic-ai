require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🟢 MongoDB conectado"))
.catch((err) => console.error("🔴 Error al conectar MongoDB", err));

// Definir el esquema de sesión
const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  historialMensajes: [String],
  intenciones: [String],
  fechasConsultadas: [String],
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

// Función para obtener la memoria de un usuario
async function getSessionMemory(userId) {
  return await Session.findOne({ userId });
}

// Función para actualizar o crear la memoria de un usuario
async function updateSessionMemory(userId, nuevaInfo) {
  await Session.findOneAndUpdate(
    { userId },
    { $set: nuevaInfo },
    { upsert: true, new: true }
  );
}

module.exports = {
  getSessionMemory,
  updateSessionMemory,
};
