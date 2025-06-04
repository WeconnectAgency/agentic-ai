import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ReActHandler } from './modules/ReActHandler.js';
import { initSessionMemory } from './modules/sessionMemory.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const reactHandler = new ReActHandler();

// ✅ CONFIGURAR CORS CORRECTAMENTE
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://noralbag4.sg-host.com',
    'https://noralbag4.sg-host.com',
    'https://agentic-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: "Mensaje y userId requeridos" });
  }

  try {
    const startTime = Date.now();
    const response = await reactHandler.manejarMensaje(userId, message);

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

// Opcional: mostrar rutas registradas
console.log("✅ Rutas registradas:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`→ ${r.route.path}`);
  }
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await initSessionMemory();
    console.log('✅ Session memory initialized');
    app.listen(port, () => {
      console.log(`Servidor ${process.env.APP_NAME || 'Alma Glamping'} escuchando en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();
