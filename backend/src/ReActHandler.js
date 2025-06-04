const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');

// Memoria temporal
const sessionMemory = new Map();

module.exports = {
    async processMessage(userId, userMessage) {
        const history = sessionMemory.get(userId) || [];
        history.push(userMessage);
        if (history.length > 10) history.shift();
        sessionMemory.set(userId, history);

        const { intencion, emocion } = detectarIntencionEmocion(userMessage);

        const prompt = `
        Historial: ${history.join('\n')}
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        Usuario: ${userMessage}
        `;

        return await callOpenAI(prompt);
    }
};