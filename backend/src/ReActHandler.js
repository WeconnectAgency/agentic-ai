const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');
const { getMemory, updateMemory } = require('./sessionMemory');

module.exports = {
    async processMessage(userId, userMessage) {
        // 1. Analizar intención
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);

        // 2. Generar prompt
        const history = getMemory(userId)
            .map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`)
            .join('\n');
        const prompt = `
        ${history}
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        Usuario: ${userMessage}
        `;

        // Registrar en memoria
        updateMemory(userId, { role: 'user', content: userMessage });

        // 3. Llamar a OpenAI
        const reply = await callOpenAI(prompt);

        // Guardar respuesta en memoria
        updateMemory(userId, { role: 'assistant', content: reply });

        return reply;
    }
};