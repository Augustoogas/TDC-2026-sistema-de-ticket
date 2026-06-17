export default function formatearFechaEvento(fechaString) {
  const fecha = new Date(fechaString);

  const fechaFormateada = fecha
    .toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    .replace(',', '');

  const horaFormateada = fecha.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${
    fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)
  } - ${horaFormateada} hs`;
}
