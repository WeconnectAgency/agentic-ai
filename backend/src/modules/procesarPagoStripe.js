export function procesarPagoStripe({ fecha, personas, monto }) {
  const link = 'https://pay.stripe.com/test';
  const mensaje = 'Pago pendiente';
  const reservaId = 'reserva-demo';
  console.log(`[💳 Pago] Link generado para reserva del ${fecha} → ${link}`);
  // TODO: integrar Stripe API aquí para futura integración real.
  return { link, mensaje, reservaId };
}
