const detectarIntencionEmocion = require('./modules/detectarIntencionEmocion');
const callOpenAI = require('./modules/callOpenAI');

// Memoria temporal
// Memoria de conversación en memoria para cada usuario
const sessionMemory = new Map();

// Configuración de límites
const MAX_HISTORY = 20; // número máximo de mensajes a guardar por usuario
const SESSION_TTL = 1000 * 60 * 60; // 1 hora en milisegundos

function cleanupSessions() {
    const now = Date.now();
    for (const [userId, session] of sessionMemory) {
        if (now - session.lastUpdated > SESSION_TTL) {
            sessionMemory.delete(userId);
        }
    }
}

module.exports = {
    /**
     * Procesa un mensaje de un usuario manteniendo el historial de la sesión.
     * @param {string} userId identificador único del usuario o token de sesión
     * @param {string} userMessage mensaje enviado por el usuario
     */
    async processMessage(userId, userMessage) {
        cleanupSessions();

        let session = sessionMemory.get(userId);
        if (!session) {
            session = { messages: [], lastUpdated: Date.now() };
            sessionMemory.set(userId, session);
        }

        session.messages.push({ role: 'user', content: userMessage, timestamp: Date.now() });
        session.lastUpdated = Date.now();

        // 1. Analizar intención y emoción del mensaje actual
        const { intencion, emocion } = detectarIntencionEmocion(userMessage);

        // 2. Generar historial para el prompt
        const historyText = session.messages.map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n');
        const prompt = `
        [Intención: ${intencion}]
        [Emoción: ${emocion}]
        ${historyText}
        `;

        // 3. Llamar a OpenAI
        const response = await callOpenAI(prompt);

        session.messages.push({ role: 'assistant', content: response, timestamp: Date.now() });
        if (session.messages.length > MAX_HISTORY) {
            session.messages.splice(0, session.messages.length - MAX_HISTORY);
        }

        return response;
    }
};