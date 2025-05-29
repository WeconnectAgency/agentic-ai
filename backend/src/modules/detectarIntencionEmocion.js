import { callOpenAI } from '../callOpenAI.js';
import { ALMA_CONFIG } from '../../config/almaConfig.js';

export async function detectarIntencionEmocion(userMessage, historial = []) {
  const prompt = `
Contexto de Alma Glamping:
${JSON.stringify(ALMA_CONFIG, null, 2)}

Analiza el mensaje del cliente:
"${userMessage}"

Realiza:
1. Detección de intención (SOLO UNA):
   - reserva
   - consulta_servicio
   - pregunta_especifica
   - queja
   - personalizacion

2. Análisis emocional:
   - entusiasmo
   - duda
   - urgencia
   - romanticismo
   - neutral

3. Detalles relevantes:
   - servicio_mencionado: [texto]
   - fechas: [array]
   - personas: [número]
   - ocasion_especial: [texto]

Respuesta SOLO en JSON:
{
  "intencion": "",
  "emocion_principal": "",
  "detalles": {}
}`;

  try {
    const response = await callOpenAI(prompt, 0.2, 300);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error en detección:", error);
    return {
      intencion: "consulta_servicio",
      emocion_principal: "neutral",
      detalles: {}
    };
  }
}