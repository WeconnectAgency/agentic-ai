module.exports = (mensaje) => {
    // Reglas simples
    const intenciones = {
        reserva: /reservar|quiero|deseo|agendar/gi,
        consulta: /disponible|precio|hay|consultar/gi,
        objeción: /lluvia|problema|preocupación|miedo/gi,
    };

    const emociones = {
        dudoso: /\?|quizás|tal vez|duda/gi,
        decidido: /!|seguro|quiero ya|definitivo/gi,
    };

    let intencion = 'conversación';
    let emocion = 'neutral';

    // Detectar intención
    for (const [key, regex] of Object.entries(intenciones)) {
        if (mensaje.match(regex)) {
            intencion = key;
            break;
        }
    }

    // Detectar emoción
    for (const [key, regex] of Object.entries(emociones)) {
        if (mensaje.match(regex)) {
            emocion = key;
            break;
        }
    }

    return { intencion, emocion };
};