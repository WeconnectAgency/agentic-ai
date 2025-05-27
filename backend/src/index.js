const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Configuración de CORS
const corsOptions = {
  origin: [
    "http://localhost:3002",
    "https://agentic-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Opciones solo para rutas específicas (evita errores de path-to-regexp)
app.options('/message', (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());

// ✅ Ruta principal de mensaje
app.post('/message', async (req, res) => {
  const message = req.body.message || '';
  console.log("📩 POST recibido en /message:", message);

  res.json({ reply: `Recibido: ${message}` });
});

// ✅ Inicio de servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${port}`);
});
