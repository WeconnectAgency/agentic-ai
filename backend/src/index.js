require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importar handler
const ReActHandler = require('./ReActHandler');

// Ruta principal
app.post('/message', async (req, res) => {
    try {
        const response = await ReActHandler.processMessage(req.body.message);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});