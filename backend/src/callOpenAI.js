import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { ALMA_CONFIG } from './config/almaConfig.js';

// Cargar variables de entorno desde el archivo localizado en ../.env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });
console.log("API KEY:", process.env.OPENAI_API_KEY);

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY no definido. Verifica backend/.env');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function callOpenAI(prompt, temperature = 0.7, max_tokens = 300) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{
        role: "system",
        content: `Eres ${ALMA_CONFIG.NOMBRE_AGENTE}, asistente de ${ALMA_CONFIG.NOMBRE_NEGOCIO}. Usa lenguaje natural y cálido con modismos como ${ALMA_CONFIG.MODISMO_1} y ${ALMA_CONFIG.MODISMO_2}.`
      }, {
        role: "user",
        content: prompt
      }],
      temperature,
      max_tokens,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
      response_format: { type: "text" }
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error en OpenAI:", error);
    return "¡Uy! Algo salió mal. ¿Podrías repetir?";
  }
}
