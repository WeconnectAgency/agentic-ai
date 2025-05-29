import express from 'express';
import { ReActHandler } from './modules/ReActHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const reactHandler = new ReActHandler();

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Mensaje requerido" });
  }

  try {
    const startTime = Date.now();
    const response = await reactHandler.manejarMensaje(message);
    
    // Simular tiempo de respuesta humano (1.5-3.5 segundos)
    const elapsed = Date.now() - startTime;
    const minDelay = 1500;
    const delay = Math.max(minDelay - elapsed, 0) + Math.random() * 2000;
    
    setTimeout(() => {
      res.json({ response });
    }, delay);
    
  } catch (error) {
    console.error("Error en endpoint /chat:", error);
    res.status(500).json({ error: "Error procesando mensaje" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Alma Glamping escuchando en http://localhost:${port}`);
});