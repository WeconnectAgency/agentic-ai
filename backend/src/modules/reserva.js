export async function consultarDisponibilidad(fecha, dataSource) {
  const reservas = await Promise.resolve(dataSource.getReservas(fecha));
  const capacidadTotal = Object.values(dataSource.capacidadPorDomo || {}).reduce((a,b) => a + b, 0);
  const capacidad = capacidadTotal || dataSource.capacidad || 0;
  return reservas < capacidad;
}

export function generarLinkDePago(baseUrl, idReserva) {
  const url = new URL(baseUrl);
  if (idReserva) {
    url.searchParams.set('id', idReserva);
  }
  return url.toString();
}
