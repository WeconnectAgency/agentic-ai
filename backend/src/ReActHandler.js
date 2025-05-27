const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');

// Memoria temporal
const sessionMemory = new Map();

module.exports = {
    async processMessage(userMessage) {
        // 1. Analizar intención
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);
        
        // 2. Generar prompt
        const prompt = `
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        Usuario: ${userMessage}
        `;

        // 3. Llamar a OpenAI
        return await callOpenAI(prompt);
    }
};