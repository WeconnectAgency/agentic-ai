export async function generarLinkDePago(fecha, personas, monto) {
  // Placeholder implementation; integrate Stripe API here in the future.
  const baseUrl = 'https://pay.stripe.com/test';
  const query = new URLSearchParams({
    fecha,
    personas: String(personas),
    monto: String(monto)
  }).toString();
  return `${baseUrl}?${query}`;
}
