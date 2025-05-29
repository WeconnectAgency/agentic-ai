import { ALMA_CONFIG } from '../../config/almaConfig.js';

export function modularRespuesta(respuestaBase, analisis) {
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
    memoriaConversacional: (historial) => {
      if (historial.length > 2) {
        const recuerdos = [
          `¿Sigue siendo para ${historial[0].detalles.ocasion_especial}?`,
          `¿${historial[0].detalles.nombre}, verdad?`,
          `¿Sigues prefiriendo el ${historial[0].detalles.servicio_mencionado}?`
        ];
        return recuerdos[Math.floor(Math.random() * recuerdos.length)] + " " + respuestaBase;
      }
      return respuestaBase;
    }
  };

  // Aplicar técnicas de humanización
  let respuesta = respuestaBase;
  respuesta = humanizar.pausasNaturales(respuesta);
  respuesta = humanizar.contracciones(respuesta);
  respuesta = humanizar.imperfeccionesControladas(respuesta);
  
  // Añadir modismos locales
  if (Math.random() < 0.4) {
    const modismos = [ALMA_CONFIG.MODISMO_1, ALMA_CONFIG.MODISMO_2, "¡Tuanis!"];
    respuesta = modismos[Math.floor(Math.random() * modismos.length)] + " " + respuesta;
  }
  
  return respuesta.charAt(0).toLowerCase() + respuesta.slice(1);
}