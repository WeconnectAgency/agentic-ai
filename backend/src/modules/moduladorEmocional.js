import { ALMA_CONFIG } from '../config/almaConfig.js';

export function modularRespuesta(respuestaBase, analisis, historial = []) {
  // Técnicas avanzadas de humanización
  const humanizar = {
    pausasNaturales: () => respuestaBase.replace(/\. /g, "... "),
    contracciones: () => respuestaBase.replace(/\bPuedo\b/g, "Puedo")
                                  .replace(/\bQuiero\b/g, "Quiero"),
    imperfeccionesControladas: () => {
      const errores = [
        "Perdón, quise decir... ",
        "Mejor dicho... ",
        "A ver, déjame reformular... "
      ];
      return Math.random() < 0.1 
        ? errores[Math.floor(Math.random() * errores.length)] + respuestaBase
        : respuestaBase;
    },
    memoriaConversacional: () => {
      if (historial.length > 0) {
        const ultimoDetalle = historial[historial.length - 1];
        if (ultimoDetalle.ocasion_especial) {
          return `¿Sigue siendo para ${ultimoDetalle.ocasion_especial}? ${respuestaBase}`;
        }
        if (ultimoDetalle.nombre) {
          return `¿${ultimoDetalle.nombre}, verdad? ${respuestaBase}`;
        }
        if (ultimoDetalle.servicio_mencionado) {
          return `¿Sigues prefiriendo el ${ultimoDetalle.servicio_mencionado}? ${respuestaBase}`;
        }
      }
      return respuestaBase;
    }
  };

  // Aplicar técnicas de humanización
  let respuesta = respuestaBase;
  respuesta = humanizar.pausasNaturales(respuesta);
  respuesta = humanizar.contracciones(respuesta);
  respuesta = humanizar.imperfeccionesControladas(respuesta);
  respuesta = humanizar.memoriaConversacional(respuesta);
  
  // Añadir modismos locales
  if (Math.random() < 0.4) {
    const modismos = [ALMA_CONFIG.MODISMO_1, ALMA_CONFIG.MODISMO_2, "¡Tuanis!"];
    respuesta = modismos[Math.floor(Math.random() * modismos.length)] + " " + respuesta;
  }
  
  return respuesta.charAt(0).toLowerCase() + respuesta.slice(1);
}