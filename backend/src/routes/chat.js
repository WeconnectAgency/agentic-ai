import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  console.log('🛬 [POST /chat] Solicitud recibida');
  if (!req.body) {
    console.warn('⚠️ req.body está completamente vacío o no fue interpretado como JSON');
  } else {
    console.log('📩 req.body recibido:', JSON.stringify(req.body, null, 2));
  }
  const { mensaje } = req.body || {};
  if (!mensaje) {
    return res.status(400).json({ error: 'Falta mensaje' });
  }
  res.json({ ok: true, mensaje });
});

export default router;
