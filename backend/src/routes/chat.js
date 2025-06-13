import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  console.log('🔄 [POST /chat] Recibida solicitud');
  console.log('📩 Body:', JSON.stringify(req.body, null, 2));
  const { mensaje } = req.body || {};
  if (!mensaje) {
    return res.status(400).json({ error: 'Falta mensaje' });
  }
  res.json({ ok: true, mensaje });
});

export default router;
