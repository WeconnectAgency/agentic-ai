module.exports = (mensaje) => {
    // Detección simple por keywords
    const intenciones = {
        reserva: /reservar|quiero|deseo|reserva/gi,
        consulta: /disponible|precio|costó|hay/gi,
        objeción: /lluvia|problema|preocupación|miedo/gi
    };

    const emociones = {
        dudoso: /\?|quizás|tal vez|no sé/gi,
        decidido: /!|seguro|quiero ya|ahora/gi
    };

    // Determinar intención principal
    let intencion = 'conversación';
    for (const [key, regex] of Object.entries(intenciones)) {
        if (mensaje.match(regex)) {
            intencion = key;
            break;
        }
    }

    // Determinar emoción
    let emocion = 'neutral';
    for (const [key, regex] of Object.entries(emociones)) {
        if (mensaje.match(regex)) {
            emocion = key;
            break;
        }
    }

    return { intencion, emocion };
};