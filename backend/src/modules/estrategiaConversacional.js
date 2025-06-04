export function decidirEstrategia(intencion, emocion, contexto = {}) {
  const ahora = Date.now();
  const ultima = contexto.ultimaRespuestaHora
    ? new Date(contexto.ultimaRespuestaHora).getTime()
    : ahora;
  const minutosInactivo = Math.floor((ahora - ultima) / 60000);

  const base = { tipoSeguimiento: null, mensajeSugerido: '', esperarMinutos: 0 };

  const reglas = [
    {
      condicion: () => ['frustracion', 'confusion'].includes(emocion),
      resultado: () => ({ tipoSeguimiento: null })
    },
    {
      condicion: () => intencion === 'consulta_general' && contexto.desaparecido,
      resultado: () => ({ tipoSeguimiento: null })
    },
    {
      condicion: () =>
        intencion === 'reserva' && minutosInactivo > 5 && contexto.desaparecido,
      resultado: () => ({
        tipoSeguimiento: 'reconectar',
        mensajeSugerido:
          '¿Sigues por ahí? Si necesitas ayuda con la reserva, estoy aquí 😊',
        esperarMinutos: 5
      })
    }
  ];

  for (const regla of reglas) {
    if (regla.condicion()) {
      return { ...base, ...regla.resultado() };
    }
  }

  return base;
}
