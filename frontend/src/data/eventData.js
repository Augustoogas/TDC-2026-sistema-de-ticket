export const EVENT_DATA = {
  1: {
    id_evento: 1,
    nombre: 'Gala de Orquesta - Teatro UNPAZ',
    fecha: 'Sábado 28 de Octubre - 21:00 hs',
    descripcion:
      'La Filarmónica Universitaria presenta un repertorio clásico con invitados especiales de la escena nacional.',
    imagen:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800',
    filas: [
      {
        letra: 'A',
        nombre: 'Palcos VIP',
        precio: 5000,
        color: '#2E7D32',
        asientos: 10,
      },
      {
        letra: 'B',
        nombre: 'Platea Baja',
        precio: 3500,
        color: '#EF6C00',
        asientos: 12,
      },
      {
        letra: 'C',
        nombre: 'Platea Alta',
        precio: 2500,
        color: '#1565C0',
        asientos: 14,
      },
      {
        letra: 'D',
        nombre: 'Pullman',
        precio: 1500,
        color: '#6A1B9A',
        asientos: 16,
      },
    ],
  },

  2: {
    id_evento: 2,
    nombre: 'Teatro Experimental - Sala B',
    fecha: 'Domingo 29 de Octubre - 19:00 hs',
    descripcion:
      'Una obra inmersiva de vanguardia que rompe la cuarta pared. Capacidad limitada para una experiencia íntima.',
    imagen:
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filas: [
      {
        letra: 'A',
        nombre: 'Palcos VIP',
        precio: 4000,
        color: '#2E7D32',
        asientos: 6,
      },
      { letra: 'B', nombre: 'Platea', precio: 2000, color: '#EF6C00', asientos: 8 },
    ],
  },

  3: {
    id_evento: 3,
    nombre: 'Coro Universitario - Auditorio Central',
    fecha: 'Viernes 3 de Noviembre - 20:30 hs',
    descripcion:
      'Más de 50 voces en escena interpretando clásicos del rock nacional en formato coral.',
    imagen:
      'https://images.unsplash.com/photo-1610254449353-5698372fa83b?q=80&w=1648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filas: [
      { letra: 'A', nombre: 'Palcos', precio: 3000, color: '#2E7D32', asientos: 12 },
      { letra: 'B', nombre: 'Platea', precio: 1800, color: '#EF6C00', asientos: 10 },
      {
        letra: 'C',
        nombre: 'Pullman',
        precio: 1200,
        color: '#6A1B9A',
        asientos: 10,
      },
    ],
  },

  4: {
    id_evento: 4,
    nombre: 'Danza Contemporánea - Espacio Abierto',
    fecha: 'Sábado 4 de Noviembre - 18:00 hs',
    descripcion:
      'Muestra anual de la cátedra de Danza. Expresión corporal y movimiento en un entorno único.',
    imagen:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
    filas: [
      { letra: 'A', nombre: 'Palcos', precio: 2800, color: '#2E7D32', asientos: 8 },
      { letra: 'B', nombre: 'Platea', precio: 1500, color: '#EF6C00', asientos: 12 },
      {
        letra: 'C',
        nombre: 'pullman',
        precio: 1000,
        color: '#6A1B9A',
        asientos: 15,
      },
    ],
  },

  //NUEVOS EVENTOS
  5: {
    id_evento: 5,
    nombre: 'Festival de Jazz Universitario',
    fecha: 'Viernes 10 de Noviembre - 21:00 hs',
    descripcion:
      'Bandas emergentes y artistas invitados en una noche dedicada al jazz.',
    imagen:
      'https://images.unsplash.com/photo-1725830071503-d705ef4a0975?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filas: [
      { letra: 'A', nombre: 'VIP', precio: 4200, color: '#2E7D32', asientos: 10 },
      { letra: 'B', nombre: 'Platea', precio: 2500, color: '#EF6C00', asientos: 14 },
      {
        letra: 'C',
        nombre: 'General',
        precio: 1500,
        color: '#1565C0',
        asientos: 20,
      },
    ],
  },

  6: {
    id_evento: 6,
    nombre: 'Stand Up Night - Humor en Vivo',
    fecha: 'Sábado 11 de Noviembre - 22:00 hs',
    descripcion: 'Una noche de comedia con comediantes locales y nacionales.',
    imagen: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800',
    filas: [
      { letra: 'A', nombre: 'VIP', precio: 3000, color: '#2E7D32', asientos: 8 },
      {
        letra: 'B',
        nombre: 'General',
        precio: 1800,
        color: '#EF6C00',
        asientos: 16,
      },
    ],
  },

  7: {
    id_evento: 7,
    nombre: 'Festival Indie - Bandas Emergentes',
    fecha: 'Domingo 12 de Noviembre - 17:00 hs',
    descripcion:
      'Descubrí nuevas bandas del circuito indie en un evento al aire libre.',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    filas: [
      {
        letra: 'A',
        nombre: 'Preferencial',
        precio: 2500,
        color: '#2E7D32',
        asientos: 12,
      },
      {
        letra: 'B',
        nombre: 'General',
        precio: 1200,
        color: '#EF6C00',
        asientos: 25,
      },
    ],
  },

  8: {
    id_evento: 8,
    nombre: 'Ciclo de Cine - Clásicos del Siglo XX',
    fecha: 'Miércoles 15 de Noviembre - 20:00 hs',
    descripcion: 'Proyección de películas icónicas con debate posterior.',
    imagen: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    filas: [
      { letra: 'A', nombre: 'Platea', precio: 1200, color: '#EF6C00', asientos: 20 },
      { letra: 'B', nombre: 'General', precio: 800, color: '#1565C0', asientos: 30 },
    ],
  },

  9: {
    id_evento: 9,
    nombre: 'Expo Tecnología & Gaming',
    fecha: 'Sábado 18 de Noviembre - 14:00 hs',
    descripcion: 'Experiencia interactiva con videojuegos, VR y tecnología.',
    imagen:
      'https://images.unsplash.com/photo-1633545495735-25df17fb9f31?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filas: [
      {
        letra: 'A',
        nombre: 'Acceso Full',
        precio: 3500,
        color: '#2E7D32',
        asientos: 15,
      },
      {
        letra: 'B',
        nombre: 'General',
        precio: 2000,
        color: '#EF6C00',
        asientos: 20,
      },
    ],
  },
};
