export function filtrarRespuestaFinal(respuesta, mensajes = []) {
  let texto = respuesta;

  // Reemplazar terminología incorrecta
  texto = texto.replace(/cabañ(?:a|as)/gi, match => {
    return match.toLowerCase().endsWith('as') ? 'domos' : 'domo';
  });

  // Detectar uso previo de modismos para evitar repetición
  const modismoRegex = /(¡?pura vida!?|¡?qué chiva!?|¡?que chiva!?)/i;
  const modismoUsado = mensajes.some(m => m.de === 'alma' && modismoRegex.test(m.texto));
  if (modismoUsado) {
    texto = texto.replace(modismoRegex, '').replace(/\s{2,}/g, ' ').trim();
  }

  // Filtrar recomendaciones genéricas que no pertenecen a la oferta
  const terminosProhibidos = /(canopy|rafting|snorkel|cabalgata|playas?)/gi;
  texto = texto.replace(terminosProhibidos, '').replace(/\s{2,}/g, ' ').trim();

  return texto;
}
