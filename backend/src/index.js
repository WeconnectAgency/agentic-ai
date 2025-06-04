const express = require('express');
const cors = require('cors');
const ReActHandler = require('./ReActHandler');

const app = express();

// CORS abierto para cualquier origen
app.use(cors());

app.use(express.json());

app.post('/message', async (req, res) => {
  console.log("📩 Se recibió una solicitud POST a /message");

  const { userId, message = '' } = req.body;
  console.log("🧾 Contenido del mensaje recibido:", { userId, message });

  try {
    const response = await ReActHandler.processMessage(userId, message);
    res.json({ response });
  } catch (error) {
    console.error('❌ Error procesando mensaje:', error);
    res.status(500).json({ error: 'Error procesando mensaje' });
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
