import express from 'express';
import { callOpenAI } from '../callOpenAI.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('🛬 [POST /chat] Solicitud recibida');

  try {
    console.log('📩 Body recibido:', JSON.stringify(req.body, null, 2));

    if (!req.body || !req.body.mensaje) {
      console.warn('⚠️ El campo "mensaje" está vacío o no existe.');
      return res.status(200).json({
        error: 'Mensaje no proporcionado',
        body: req.body
      });
    }

    // Aquí seguiría la lógica normal del agente...
  } catch (err) {
    console.error('💥 Error procesando body:', err.message);
    return res.status(500).json({
      error: 'Error interno al procesar el body'
    });
  }

  const { mensaje } = req.body;

  try {
    const respuesta = await callOpenAI(mensaje);
    return res.json({ ok: true, mensaje: respuesta });
  } catch (err) {
    console.error('💥 Error generando respuesta de OpenAI:', err.message);
    return res.status(500).json({
      error: 'Error interno al generar respuesta'
    });
  }
});

export default router;
