import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ReActHandler } from './modules/ReActHandler.js';
import { initSessionMemory } from './modules/sessionMemory.js';
import chatRoutes from './routes/chat.js';
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
    'https://agentic-frontend.onrender.com',
    'https://bluezonepropertiescr.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
console.log('✅ express.json() activado para analizar cuerpos de solicitud JSON');

app.use('/chat', chatRoutes);

// Opcional: mostrar rutas registradas
console.log("✅ Rutas registradas:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`→ ${r.route.path}`);
  }
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 1000 });
    console.log('✅ Connected to MongoDB');
    await initSessionMemory();
    console.log('✅ Session memory initialized');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
  app.listen(port, () => {
    console.log(`Servidor ${process.env.APP_NAME || 'Alma Glamping'} escuchando en http://localhost:${port}`);
  });
}

startServer();
