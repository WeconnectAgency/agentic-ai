const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Lista actualizada de dominios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://noralbag4.sg-host.com',
  'https://noralbag4.sg-host.com',
  'https://agentic-frontend.onrender.com'
];

// 🔐 Configuración CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('🚨 Origen bloqueado por CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// ✅ Middleware base
app.use(cors(corsOptions));
app.use(express.json());

// 🛡️ Inyección manual de headers CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// ✅ Manejo explícito de preflight para /message
app.options('/message', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(204);
});

// ✅ Ruta principal
app.post('/message', async (req, res) => {
  try {
    const message = req.body.message || '';
    res.json({ reply: `Recibido: ${message}` });
  } catch (error) {
    console.error("❌ Error interno:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 🚀 Arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${port}`);
});
