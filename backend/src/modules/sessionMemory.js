import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  history: [mongoose.Schema.Types.Mixed],
  ultimaRespuestaHora: { type: Date, default: Date.now },
  historialMensajes: [{
    role: String,
    mensaje: String,
    timestamp: { type: Date, default: Date.now }
  }],
  desaparecido: { type: Boolean, default: false }
});

const Session = mongoose.model('Session', sessionSchema);

export function initSessionMemory() {
  return Session.init();
}

export async function getSessionMemory(userId) {
  try {
    const session = await Session.findOne({ userId }).exec();
    return session ? session.history : [];
  } catch (err) {
    console.error('Error getting session memory:', err);
    return [];
  }
}

export async function updateSessionMemory(userId, history) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      { userId, history: history.slice(-10) },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error updating session memory:', err);
  }
}

export async function getContextoConversacion(userId) {
  try {
    const session = await Session.findOne({ userId }).exec();
    if (!session) {
      return {};
    }
    return {
      historialMensajes: session.historialMensajes || [],
      ultimaRespuestaHora: session.ultimaRespuestaHora,
      desaparecido: session.desaparecido
    };
  } catch (err) {
    console.error('Error getting contexto conversacional:', err);
    return {};
  }
}

export async function registrarMensaje(userId, role, mensaje) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      {
        $push: { historialMensajes: { role, mensaje, timestamp: new Date() } }
      },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error registrando mensaje:', err);
  }
}

export async function actualizarUltimaHora(userId, timestamp = new Date()) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      { ultimaRespuestaHora: timestamp, desaparecido: false },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error actualizando ultima hora:', err);
  }
}

export { detectarDesaparicion } from './detectorDesaparicion.js';
