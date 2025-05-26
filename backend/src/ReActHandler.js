const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./callOpenAI');
const memoriaContextual = require('./modules/memoriaContextual');

// Memoria temporal en sesión
const sessionMemory = new Map();

module.exports = {
    async processMessage(userMessage) {
        // 1. THINK: Analizar contexto
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);
        
        // 2. ACT: Consultar memoria
        const contexto = memoriaContextual.obtenerContexto(sessionMemory);
        
        // 3. Generar prompt
        const prompt = `
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        [Historial: ${contexto.slice(-3).join(' | ')}]
        Usuario: ${userMessage}
        `;

        // 4. Obtener respuesta de OpenAI
        const respuesta = await callOpenAI(prompt);

        // 5. Actualizar memoria
        memoriaContextual.actualizarMemoria(sessionMemory, userMessage, respuesta);

        return respuesta;
    }
};