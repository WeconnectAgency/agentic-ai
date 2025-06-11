export function registrarInteraccion(tipo, datos = {}) {
  const serializado = JSON.stringify(datos);
  console.log(`[🧠 Interacción] ${tipo} → ${serializado}`);
  // TODO: Integrar con base de datos para almacenar interacciones
}
