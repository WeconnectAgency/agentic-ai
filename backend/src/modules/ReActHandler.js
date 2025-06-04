import { callOpenAI } from '../callOpenAI.js';
import { detectarIntencionEmocion } from './detectarIntencionEmocion.js';
import { modularRespuesta } from './moduladorEmocional.js';
import { ALMA_CONFIG } from '../config/almaConfig.js';

export class ReActHandler {
  constructor() {
    // Mapa para almacenar la sesión de cada usuario
    this.sesiones = new Map();
  }

  /**
   * Obtiene la sesión asociada a un usuario
   * @param {string} userId
   */
  obtenerSesion(userId) {
    if (!this.sesiones.has(userId)) {
      this.sesiones.set(userId, { historial: [], contadorCierres: 0 });
    }
    return this.sesiones.get(userId);
  }

  async manejarMensaje(userId, userMessage) {
    const sesion = this.obtenerSesion(userId);
    const analisis = await detectarIntencionEmocion(userMessage, sesion.historial);

    // Guardar detalles importantes
    if (analisis.detalles && Object.keys(analisis.detalles).length > 0) {
      sesion.historial.push(analisis.detalles);
    }

    let respuestaBase = await this.generarRespuestaConversacional(userMessage, analisis, sesion.historial);
    let respuestaFinal = modularRespuesta(respuestaBase, analisis, sesion.historial);

    // Estrategia de cierre progresivo
    sesion.contadorCierres++;
    if (sesion.contadorCierres > 2 && analisis.intencion !== 'reserva') {
      respuestaFinal = this.agregarCierreNatural(respuestaFinal, analisis);
    }

    return respuestaFinal;
  }

  async generarRespuestaConversacional(userMessage, analisis, historial) {
    const serviciosDisponibles = ALMA_CONFIG.SERVICIOS_ADICIONALES.map(s => s.nombre).join(', ');
    const tiposDomo = Object.keys(ALMA_CONFIG.DOMOS).map(d => `${d} ($${ALMA_CONFIG.DOMOS[d].precio})`).join(' o ');
    
    const prompt = `
Eres ${ALMA_CONFIG.NOMBRE_AGENTE}, asistente de ${ALMA_CONFIG.NOMBRE_NEGOCIO}. 
Características: ${ALMA_CONFIG.CARACTERISTICA_1}, ${ALMA_CONFIG.CARACTERISTICA_2}
Modismos: ${ALMA_CONFIG.MODISMO_1}, ${ALMA_CONFIG.MODISMO_2}

Contexto:
- Domos disponibles: ${tiposDomo}
- Servicios: ${serviciosDisponibles}
- Ubicación: ${ALMA_CONFIG.POLITICAS.ubicacion}
- Clima: ${ALMA_CONFIG.POLITICAS.clima}

Análisis del cliente:
- Intención: ${analisis.intencion}
- Emoción: ${analisis.emocion_principal}
- Detalles: ${JSON.stringify(analisis.detalles || {})}

Historial conversación (últimas 2 interacciones):
${historial.slice(-2).map(h => JSON.stringify(h)).join('\n')}

Instrucciones:
1. Usa lenguaje natural con pausas (...), contracciones y modismos
2. Adapta tu tono a la emoción detectada
3. Incorpora 1 elemento sensorial (vista, sonido, aroma) de: ${ALMA_CONFIG.EXPERIENCIAS_CLAVE.join(', ')}
4. Máximo 2 oraciones
5. Aplica estrategia de venta sutil:
   ${this.obtenerEstrategiaVenta(analisis)}

Cliente dice: "${userMessage}"

Respuesta:
    `;
    
    return await callOpenAI(prompt, 0.7, 150);
  }

  obtenerEstrategiaVenta(analisis) {
    const estrategias = {
      duda: `• Técnica "Puente Dorado": "Por eso nuestro ${ALMA_CONFIG.DOMOS['Domo Jr Suite'] ? 'Domo Jr Suite' : 'Domo Suite'} sería perfecto para..."`,
      romanticismo: `• Técnica "Magia Sensorial": "Imagina despertar con el aroma de café fresco, ${ALMA_CONFIG.ESCENA_RELEVANTE}..."`,
      urgencia: `• Técnica "Scarcity": "Queda solo 1 ${Object.keys(ALMA_CONFIG.DOMOS)[0]} disponible para esas fechas..."`,
      reserva: `• Técnica "Cierre Suave": "¿Te reservo ahora mismo? Solo necesito ${ALMA_CONFIG.PROCESO_RESERVA}"`,
      default: `• Técnica "Beneficio Emocional": "La experiencia perfecta para ${ALMA_CONFIG.BENEFICIO_EMOCIONAL}"`
    };

    return estrategias[analisis.emocion_principal] || estrategias.default;
  }

  agregarCierreNatural(respuesta, analisis) {
    const cierres = [
      `¿Te gustaría reservar tu experiencia para ${analisis.detalles?.fechas ? analisis.detalles.fechas[0] : 'estas fechas'}?`,
      `¿Querés que te ayude a asegurar tu domo? Solo necesito ${ALMA_CONFIG.PROCESO_RESERVA}`,
      `¿Te interesaría que te envíe fotos reales de los domos disponibles?`,
      `¿Preferís continuar por WhatsApp? Te puedo enviar más detalles al +506 XXXXXXX`
    ];
    
    return `${respuesta}... ${cierres[Math.floor(Math.random() * cierres.length)]}`;
  }
}
