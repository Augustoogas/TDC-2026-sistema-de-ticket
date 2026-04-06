import { EVENT_DATA } from '../data/eventData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- FUNCIONES DE AYUDA PARA LOCALSTORAGE ---
const getLocal = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- INICIALIZACIÓN DE DATOS (Carga desde LocalStorage)
let users = getLocal('situ_users', [
  { id: "1", username: "admin", password: "123", role: "ADMIN", nombre: "Administrador SITU" },
  { id: "2", username: "alumno", password: "123", role: "USER", nombre: "Estudiante UNPAZ" }
]);

let teatros = getLocal('situ_teatros', [
  { 
    id: "T1", 
    nombre: "Aula Magna UNPAZ", 
    filas: [
      { letra: 'A', nombre: 'VIP', precio: 5000, color: '#ffd700', asientos: 10, categoriaId: 'C1' },
      { letra: 'B', nombre: 'General', precio: 3000, color: '#1e90ff', asientos: 15, categoriaId: 'C2' }
    ]
  }
]);

let categorias = getLocal('situ_categorias', [
  { id: 'C1', nombre: 'VIP', precioBase: 5000, color: '#ffd700' },
  { id: 'C2', nombre: 'General', precioBase: 3000, color: '#1e90ff' },
  { id: 'C3', nombre: 'Platea', precioBase: 4000, color: '#32cd32' }
]);

let events = getLocal('situ_events', Object.values(EVENT_DATA));

// --- SERVICIOS ---

export const EventService = {
  getAllEvents: async () => { await delay(300); return events; },
  getEventDetail: async (id) => { await delay(300); return events.find(e => e.id_evento === parseInt(id)); },
  getTeatros: async () => { await delay(200); return teatros; },
  
  getCategorias: async () => { await delay(200); return categorias; },
  saveCategoria: async (cat) => {
    if (cat.id) {
      const idx = categorias.findIndex(c => c.id === cat.id);
      categorias[idx] = cat;
    } else {
      categorias.push({ ...cat, id: 'CAT-' + Date.now() });
    }
    setLocal('situ_categorias', categorias); // PERSISTIR
    return { success: true };
  },
  deleteCategoria: async (id) => { 
    categorias = categorias.filter(c => c.id !== id); 
    setLocal('situ_categorias', categorias); 
    return { success: true }; 
  },

  saveTeatro: async (t) => {
    if (t.id) {
      const idx = teatros.findIndex(tea => tea.id === t.id);
      teatros[idx] = t;
    } else {
      teatros.push({ ...t, id: "T-" + Date.now() });
    }
    setLocal('situ_teatros', teatros);
    return { success: true };
  },
  deleteTeatro: async (id) => { 
    teatros = teatros.filter(t => t.id !== id); 
    setLocal('situ_teatros', teatros);
    return { success: true }; 
  },

  saveEvent: async (eventData) => {
    const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
    const fechaObj = new Date(eventData.fechaStr + "T12:00:00"); 
    let fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);
    fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    const sala = teatros.find(t => t.id === eventData.teatroId);
    const nuevoEvento = {
      id_evento: Date.now(),
      nombre: eventData.nombre,
      fecha: `${fechaFormateada} - ${eventData.horaStr} hs`, 
      descripcion: eventData.descripcion,
      imagen: eventData.imagen || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800",
      filas: sala ? sala.filas : []
    };
    events.unshift(nuevoEvento); 
    setLocal('situ_events', events);
    return nuevoEvento;
  },
  deleteEvent: async (id) => { 
    events = events.filter(e => e.id_evento !== id); 
    setLocal('situ_events', events);
    return { success: true }; 
  }
};

export const AdminService = {
  getUsers: async () => { await delay(300); return users.filter(u => u.role === "USER"); },
  deleteUser: async (id) => { 
    users = users.filter(u => u.id !== id); 
    setLocal('situ_users', users);
    return { success: true }; 
  },
  saveUser: async (u) => {
    if (u.id) {
        const idx = users.findIndex(user => user.id === u.id);
        users[idx] = { ...users[idx], ...u };
    } else {
        users.push({ ...u, id: Date.now().toString(), role: 'USER' });
    }
    setLocal('situ_users', users);
    return { success: true };
  }
};

export const AuthService = {
    login: async (u, p) => {
      const user = users.find(user => user.username === u && user.password === p);
      if (!user) throw new Error("Credenciales inválidas");
      return user;
    }
};

export const PurchaseService = {
    sendPurchase: async (purchaseData) => {
      await delay(1500);
      return { success: true, orderId: "SITU-" + Math.random().toString(36).substr(2, 9).toUpperCase() };
    }
};