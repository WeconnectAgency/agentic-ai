import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  history: [mongoose.Schema.Types.Mixed],
  mensajes: [{
    de: String,
    texto: String,
    timestamp: { type: Date, default: Date.now }
  }],
  ultimaRespuestaHora: { type: Date, default: Date.now },
  ultimaActualizacion: { type: Date, default: Date.now },
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
      { userId, history: history.slice(-10), ultimaActualizacion: new Date() },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error updating session memory:', err);
  }
}

export async function obtenerMensajes(userId) {
  try {
    const session = await Session.findOne({ userId }).exec();
    return session ? session.mensajes || [] : [];
  } catch (err) {
    console.error('Error obteniendo mensajes:', err);
    return [];
  }
}

export async function agregarMensaje(userId, de, texto) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      {
        $push: { mensajes: { de, texto, timestamp: new Date() } },
        ultimaActualizacion: new Date()
      },
      { upsert: true }
    ).exec();
    await podarMensajes(userId);
  } catch (err) {
    console.error('Error agregando mensaje:', err);
  }
}

async function podarMensajes(userId) {
  const session = await Session.findOne({ userId }).exec();
  if (session && session.mensajes && session.mensajes.length > 10) {
    session.mensajes = session.mensajes.slice(-10);
    await session.save();
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
      mensajes: session.mensajes || [],
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
        $push: { historialMensajes: { role, mensaje, timestamp: new Date() } },
        $push: { mensajes: { de: role === 'assistant' ? 'alma' : 'usuario', texto: mensaje, timestamp: new Date() } },
        ultimaActualizacion: new Date()
      },
      { upsert: true }
    ).exec();
    await podarMensajes(userId);
  } catch (err) {
    console.error('Error registrando mensaje:', err);
  }
}

export async function actualizarUltimaHora(userId, timestamp = new Date()) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      { ultimaRespuestaHora: timestamp, ultimaActualizacion: new Date(), desaparecido: false },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error actualizando ultima hora:', err);
  }
}

export { detectarDesaparicion } from './detectorDesaparicion.js';
