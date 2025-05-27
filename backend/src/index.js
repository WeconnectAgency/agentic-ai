const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Lista actualizada de dominios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'http://noralbag4.sg-host.com',
  'https://noralbag4.sg-host.com',
  'http://localhost:3002',
  'https://agentic-frontend.onrender.com'
];

// 🔐 Configuración robusta de CORS
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
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Manejo correcto de preflight OPTIONS
app.options('*', cors(corsOptions));

// ✅ Ruta principal con manejo seguro de errores
app.post('/message', async (req, res) => {
  try {
    const message = req.body.message || '';
    res.json({ reply: `Recibido: ${message}` });
  } catch (error) {
    console.error("❌ Error interno:", error);

    // 👇 CORS seguro para errores
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${port}`);
});
