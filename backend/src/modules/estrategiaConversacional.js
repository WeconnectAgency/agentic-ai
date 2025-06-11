function decidirEstrategia(intencion, emocion, contexto = {}) {
  const ahora = Date.now();
  const ultima = contexto.ultimaRespuestaHora
    ? new Date(contexto.ultimaRespuestaHora).getTime()
    : ahora;
  const minutosInactivo = Math.floor((ahora - ultima) / 60000);

  // Caso especial: desapareció en medio de una reserva
  if (intencion === 'reserva' && minutosInactivo > 5 && contexto.desaparecido) {
    console.log('↪ estrategia: reconectar por posible reserva perdida');
    return {
      tipoSeguimiento: 'reconectar',
      mensajeSugerido:
        '¿Sigues por ahí? Si necesitas ayuda con la reserva, estoy aquí 😊',
      esperarMinutos: 5
    };
  }

  // No realizamos seguimiento para consultas generales si la persona está ausente
  if (intencion === 'consulta_general' && contexto.desaparecido) {
    return null;
  }

  // Estrategias según la emoción principal detectada
  switch (emocion) {
    case 'frustracion':
    case 'enfado':
      // Usuario molesto: esperar a que pida ayuda nuevamente
      return {
        tipoSeguimiento: 'esperar_solicitud',
        mensajeSugerido:
          'Entiendo que esto puede ser frustrante. Estoy aquí si necesitas resolverlo, sin presión 🙏',
        esperarMinutos: null
      };

    case 'confusion':
    case 'duda':
      // Ofrecer explicación paso a paso
      return {
        tipoSeguimiento: 'explicacion',
        mensajeSugerido:
          'A veces puede parecer un poco confuso al principio, ¿quieres que te lo explique paso a paso?',
        esperarMinutos: 3
      };

    case 'entusiasmo':
    case 'emocion':
      // Responder de inmediato al entusiasmo
      return {
        tipoSeguimiento: 'inmediato',
        mensajeSugerido:
          '¡Qué alegría que te emocione! Si ya tienes una fecha en mente, reviso la disponibilidad ya mismo 🏡✨',
        esperarMinutos: 1
      };

    case 'ansiedad':
    case 'urgencia':
      // Atención acelerada para sentimientos de urgencia
      return {
        tipoSeguimiento: 'acelerado',
        mensajeSugerido:
          'Estoy aquí para ayudarte lo más rápido posible. ¿Te gustaría asegurar tu espacio ya mismo?',
        esperarMinutos: 2
      };

    case 'desinteres':
      // Despedida amable ante falta de interés
      return {
        tipoSeguimiento: 'despedida_suave',
        mensajeSugerido:
          'Gracias por pasar por acá. Si en algún momento deseas escapar al bosque… aquí estaré 🌿',
        esperarMinutos: null
      };

    case 'interes_leve':
      // Seguimiento ligero para curiosidad inicial
      return {
        tipoSeguimiento: 'ligero',
        mensajeSugerido:
          'Si solo estás curioseando, no hay problema 😊. ¿Quieres que te muestre algo que te pueda interesar?',
        esperarMinutos: 5
      };

    default:
      // Sin estrategia de seguimiento definida
      return null;
  }
}

module.exports = { decidirEstrategia };
