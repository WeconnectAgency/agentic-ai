import { enviarCorreoConfirmacion } from './enviarCorreoConfirmacion.js';

function pagoRealizado(contexto) {
  const mensajes = contexto.historialMensajes || [];
  return mensajes.some(m =>
    m.role === 'user' && /(pago|pagado|pag\u00E9).*?(realizado|confirmado|mock)/i.test(m.mensaje)
  );
}

async function decidirEstrategia(intencion, emocion, contexto = {}) {
  const ahora = Date.now();
  const ultima = contexto.ultimaRespuestaHora
    ? new Date(contexto.ultimaRespuestaHora).getTime()
    : ahora;
  const minutosInactivo = Math.floor((ahora - ultima) / 60000);

  let estrategia = null;

  if (pagoRealizado(contexto)) {
    console.log('↪ Pago confirmado detectado. Enviando correo de confirmación');
    await enviarCorreoConfirmacion(contexto.datosReserva || {});
    return null;
  }

  // Seguimiento activo solicitado desde el contexto
  if (contexto.seguimiento === true) {
    estrategia = {
      tipoSeguimiento: 'reconectar',
      mensajeSugerido: '¿Te sigo ayudando con tu reserva? 😊',
      esperarMinutos: 3
    };
    console.log('↪ estrategia: seguimiento activo - reconectar');
    console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
    return estrategia;
  }

  // Caso especial: desapareció en medio de una reserva
  if (intencion === 'reserva' && minutosInactivo > 5 && contexto.desaparecido) {
    estrategia = {
      tipoSeguimiento: 'reconectar',
      mensajeSugerido:
        '¿Sigues por ahí? Si necesitas ayuda con la reserva, estoy aquí 😊',
      esperarMinutos: 5
    };
    console.log('↪ estrategia: reconectar por posible reserva perdida');
    console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
    return estrategia;
  }

  // No realizamos seguimiento para consultas generales si la persona está ausente
  if (intencion === 'consulta_general' && contexto.desaparecido) {
    console.log('↪ estrategia: ninguna - consulta general sin seguimiento');
    return null;
  }

  // Estrategias según la emoción principal detectada
  switch (emocion) {
    case 'frustracion':
    case 'enfado':
      // Usuario molesto: esperar a que pida ayuda nuevamente
      estrategia = {
        tipoSeguimiento: 'esperar_solicitud',
        mensajeSugerido:
          'Entiendo que esto puede ser frustrante. Estoy aquí si necesitas resolverlo, sin presión 🙏',
        esperarMinutos: null
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    case 'confusion':
    case 'duda':
      // Ofrecer explicación paso a paso
      estrategia = {
        tipoSeguimiento: 'explicacion',
        mensajeSugerido:
          'A veces puede parecer un poco confuso al principio, ¿quieres que te lo explique paso a paso?',
        esperarMinutos: 3
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    case 'entusiasmo':
    case 'emocion':
      // Responder de inmediato al entusiasmo
      estrategia = {
        tipoSeguimiento: 'inmediato',
        mensajeSugerido:
          '¡Qué alegría que te emocione! Si ya tienes una fecha en mente, reviso la disponibilidad ya mismo 🏡✨',
        esperarMinutos: 1
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    case 'ansiedad':
    case 'urgencia':
      // Atención acelerada para sentimientos de urgencia
      estrategia = {
        tipoSeguimiento: 'acelerado',
        mensajeSugerido:
          'Estoy aquí para ayudarte lo más rápido posible. ¿Te gustaría asegurar tu espacio ya mismo?',
        esperarMinutos: 2
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    case 'desinteres':
      // Despedida amable ante falta de interés
      estrategia = {
        tipoSeguimiento: 'despedida_suave',
        mensajeSugerido:
          'Gracias por pasar por acá. Si en algún momento deseas escapar al bosque… aquí estaré 🌿',
        esperarMinutos: null
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    case 'interes_leve':
      // Seguimiento ligero para curiosidad inicial
      estrategia = {
        tipoSeguimiento: 'ligero',
        mensajeSugerido:
          'Si solo estás curioseando, no hay problema 😊. ¿Quieres que te muestre algo que te pueda interesar?',
        esperarMinutos: 5
      };
      console.log(`↪ estrategia elegida: ${estrategia.tipoSeguimiento}`);
      return estrategia;

    default:
      // Sin estrategia de seguimiento definida
      console.log('↪ estrategia: ninguna');
      return null;
  }
}

export { decidirEstrategia };
