export function ajustarPrompt(prompt, mensajes = []) {
  const saludosRegex = /(hola|¿como estas\??|buen[oa]s)/i;
  const modismosRegex = /(pura vida|que chiva)/i;

  const haSaludado = mensajes.some(m => m.de === 'alma' && saludosRegex.test(m.texto));
  const haUsadoModismo = mensajes.some(m => m.de === 'alma' && modismosRegex.test(m.texto));

  let instrucciones = [];
  if (haSaludado) {
    instrucciones.push('Evita repetir saludos al usuario.');
  }
  if (haUsadoModismo) {
    instrucciones.push('No repitas modismos ticos como "¡Pura vida!" o "¡Qué chiva!".');
  }

  if (instrucciones.length > 0) {
    return `${prompt}\nConsideraciones adicionales: ${instrucciones.join(' ')}`;
  }
  return prompt;
}

