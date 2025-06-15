import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
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
  res.json({ ok: true, mensaje });
});

export default router;
