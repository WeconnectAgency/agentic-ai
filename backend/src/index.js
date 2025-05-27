const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Configuración de CORS
const corsOptions = {
  origin: [
      "http://noralbag4.sg-host.com", // ✅ Tu dominio WordPress
    "http://localhost:3002",
    "https://agentic-backend-v2.onrender.com"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Opciones solo para rutas específicas (evita errores de path-to-regexp)
app.use(cors(corsOptions));

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
