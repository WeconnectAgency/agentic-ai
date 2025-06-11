import mongoose from 'mongoose';

export async function detectarDesaparicion(userId, minutos = 5) {
  try {
    const Session = mongoose.model('Session');
    const session = await Session.findOne({ userId }).exec();
    if (!session || !session.ultimaRespuestaHora) return false;
    const diffMin =
      (Date.now() - new Date(session.ultimaRespuestaHora).getTime()) / 60000;
    const desaparecido = diffMin > minutos;
    if (session.desaparecido !== desaparecido) {
      session.desaparecido = desaparecido;
      await session.save();
    }
    return desaparecido;
  } catch (err) {
    console.error('Error detectando desaparicion:', err);
    return false;
  }
}
