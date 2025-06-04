const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');
const { getSessionMemory, updateSessionMemory } = require('./sessionMemory');

module.exports = {
    async processMessage(userId, userMessage) {
        const historial = await getSessionMemory(userId);
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);

        const prompt = `
        [Historial previo: ${historial.join('\n')}]
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        Usuario: ${userMessage}
        `;

        const respuesta = await callOpenAI(prompt);

        await updateSessionMemory(userId, { mensaje: userMessage, intencion });

        return respuesta;
    }
};
