const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');
const sessionMemory = require('./modules/sessionMemory');

module.exports = {
    async processMessage(userId, userMessage) {
        // 1. Analizar intención
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);

        // Recuperar la memoria del usuario
        const memory = sessionMemory.getMemory(userId);

        const history = memory.map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n');
        
        // 2. Generar prompt
        const prompt = `
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        ${history}
        Usuario: ${userMessage}
        `;

        // 3. Llamar a OpenAI
        const response = await callOpenAI(prompt);

        // Actualizar memoria del usuario
        sessionMemory.addExchange(userId, userMessage, response);

        return response;
    }
};