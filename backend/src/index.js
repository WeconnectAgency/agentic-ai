const express = require('express');
const cors = require('cors');
const ReActHandler = require('./ReActHandler');

const app = express();

const corsOptions = {
  origin: ["http://localhost:3002", "https://agentic-frontend.onrender.com"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ CORS aplicado globalmente
app.use(cors(corsOptions));

// ✅ Corrección aquí: manejamos OPTIONS manualmente
app.options('*', (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());

app.post('/message', async (req, res) => {
  console.log("📩 Se recibió una solicitud POST a /message");

  const message = req.body.message || '';
  console.log("🧾 Contenido del mensaje recibido:", message);

  try {
    const reply = await ReActHandler.processMessage(message);
    res.json({ reply });
  } catch (error) {
    console.error('❌ Error al procesar el mensaje:', error);
    res.status(500).json({ error: 'Error interno al procesar el mensaje' });
  }
});


const port = process.env.PORT || 3000;
console.log("✅ Rutas registradas:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`→ ${r.route.path}`);
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${port}`);
});
