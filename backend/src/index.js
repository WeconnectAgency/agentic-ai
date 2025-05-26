require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar módulo principal
const ReActHandler = require('./ReActHandler');

// Ruta principal
app.post('/message', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await ReActHandler.processMessage(userMessage);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));