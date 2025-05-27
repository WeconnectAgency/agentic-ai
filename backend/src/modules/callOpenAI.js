require('dotenv').config(); // Asegura que cargue variables de entorno

const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Eres un asistente conversacional profesional.' },
                { role: 'user', content: prompt }
            ],
        });

        return completion.choices[0]?.message?.content || '[Sin respuesta]';
    } catch (error) {
        console.error('❌ Error al llamar a OpenAI:', error?.response?.data || error.message);
        return 'Lo siento, hubo un error procesando tu solicitud. Intenta de nuevo más tarde.';
    }
};
