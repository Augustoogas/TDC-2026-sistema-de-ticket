import { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, useTheme } from '@mui/material';
import { AdminService, EventService } from '../services/api';
import EventDialog from '../components/admin/dialog/EventDialog';
import UserDialog from '../components/admin/dialog/UserDialog';
import CategoriaDialog from '../components/admin/dialog/CategoriaDialog';
import SalaDialog from '../components/admin/dialog/SalaDialog';
import EventsTab from '../components/admin/tabs/EventsTab';
import SalasTab from '../components/admin/tabs/SalasTab';
import UsersTab from '../components/admin/tabs/UsersTab';
import CategoriasTab from '../components/admin/tabs/CategoriasTab';

const AdminPanel = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [locaciones, setLocaciones] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [openSala, setOpenSala] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const [locacionForm, setLocacionForm] = useState({
  idLocacion: null,
  nombre: '',
  direccion: '',
  sectores: []
});
  const [eventForm, setEventForm] = useState({
    id_evento: null,
    nombre: '',
    fechaStr: '',
    horaStr: '',
    descripcion: '',
    imagen: '',
    locacionId: '',
  });
  const [userForm, setUserForm] = useState({
    id: null,
    nombre: '',
    username: '',
    password: '',
  });
  const [catForm, setCatForm] = useState({
    id: null,
    nombre: '',
    precioBase: 1000,
    color: theme.palette.primary.main,
  });

  const loadData = async () => {
    const [l, e, u, c] = await Promise.all([
      EventService.getLocaciones(),
      EventService.getAllEvents(),
      AdminService.getUsers(),
      EventService.getCategorias(),
    ]);
    setLocaciones(l);
    setEvents(e);
    setUsers(u);
    setCategorias(c);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [ l, e, u, c] = await Promise.all([
        EventService.getLocaciones(),
        EventService.getAllEvents(),
        AdminService.getUsers(),
        EventService.getCategorias(),
      ]);
      setLocaciones(l);
      setEvents(e);
      setUsers(u);
      setCategorias(c);
    };

    fetchData();
  }, []);

  const closeModals = () => {
    setOpenEvent(false);
    setOpenSala(false);
    setOpenUser(false);
    setOpenCat(false);
    setErrorMsg('');
  };

  // DELETE HANDLERS
  const handleDeleteEvent = async (id) => {
    await EventService.deleteEvent(id);
    loadData();
  };

  const handleDeleteUser = async (id) => {
    await AdminService.deleteUser(id);
    loadData();
  };

  const handleDeleteCategoria = async (id) => {
    await EventService.deleteCategoria(id);
    loadData();
  };

  const handleDeleteSala = async (id) => {
    await EventService.deleteSala(id);
    loadData();
  };

  // EVENT EDIT
  const handleEditEvent = (e) => {
    const parseFechaAmigable = (texto) => {
      if (!texto || !texto.includes(' de ')) return '';
      try {
        const meses = {
          enero: '01', febrero: '02', marzo: '03', abril: '04',
          mayo: '05', junio: '06', julio: '07', agosto: '08',
          septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
        };

        const partes = texto.split(' ');
        const dia = partes[1].padStart(2, '0');
        const mes = meses[partes[3].toLowerCase()];
        const anio = 2026;

        return `${anio}-${mes}-${dia}`;
      } catch {
        return '';
      }
    };

    const parseHoraAmigable = (texto) => {
      if (!texto) return '';
      const match = texto.match(/(\d{2}:\d{2})/);
      return match ? match[1] : '';
    };

    let idEncontrado = e.idLocacion || e.id_locacion || '';

    if (!idEncontrado && locaciones && locaciones.length > 0) {
      const nombreEventoSeguro = (e.nombre || e.titulo || '').toLowerCase();
      
      const coincidencia = locaciones.find((l) => {
        const nombreLocacionSeguro = (l.nombre || '').toLowerCase();
        return nombreLocacionSeguro !== '' && nombreEventoSeguro.includes(nombreLocacionSeguro);
      });
      
      if (coincidencia) idEncontrado = coincidencia.idLocacion;
    }

    setEventForm({
      idEvento: e.eventoId || e.idEvento || e.id || null, 
      eventoId: e.eventoId || null, 
      nombre: e.titulo || e.nombre || '', 
      fechaStr: parseFechaAmigable(e.fecha || e.fechaStr || ''),
      horaStr: parseHoraAmigable(e.fecha || e.horaStr || ''),
      descripcion: e.descripcion || '',
      imagen: e.imagen || '',
      locacionId: idEncontrado,
    });

    setOpenEvent(true);
  };


  const handleSaveEvent = async () => {
    setErrorMsg('');

    if (
      !eventForm.nombre?.trim() ||
      !eventForm.fechaStr ||
      !eventForm.horaStr ||
      !eventForm.locacionId ||
      !eventForm.descripcion?.trim()
    ) {
      return setErrorMsg('Error: Todos los campos son obligatorios.');
    }

    const fechaSel = new Date(`${eventForm.fechaStr}T${eventForm.horaStr}`);
    if (fechaSel < new Date()) {
      return setErrorMsg('Error: La fecha no puede ser anterior a la actual.');
    }
     const user = JSON.parse(localStorage.getItem('user'));

    const payload = {
      idEvento: eventForm.idEvento || eventForm.eventoId || null,
      eventoId: eventForm.idEvento || eventForm.eventoId || null,
      titulo: eventForm.nombre,
      descripcion: eventForm.descripcion,
      fecha: `${eventForm.fechaStr}T${eventForm.horaStr}:00`,
      locacionId: Number(eventForm.locacionId),
      creadorId: user?.id || null, 
      tipo: 'Conferencia',
      categoriaId: 1,
      imagen: eventForm.imagen || '' 
    };

    console.log("=== INSPECCIÓN DE PAYLOAD ANTES DE ENVIAR ===");
    console.log("Objeto payload completo:", payload);
    console.log("¿Tiene idEvento?:", payload.idEvento);

    try {
      await EventService.saveEvent(payload);
      closeModals();
      loadData();
    } catch (err) {
      console.error("Error al guardar el evento:", err);
      setErrorMsg('Error al conectar con el servidor: ' + err.message);
    }
  };

const handleSaveSala = async () => {
  setErrorMsg('');

  if (!locacionForm.nombre?.trim() || !locacionForm.direccion?.trim()) {
    return setErrorMsg('El nombre y la dirección son obligatorios.');
  }

  if (!locacionForm.sectores || locacionForm.sectores.length === 0) {
    return setErrorMsg('Debe existir al menos un sector.');
  }

  const sectorInvalido = locacionForm.sectores.some(
    s => !s.nombre?.trim() || s.capacidad <= 0
  );
  if (sectorInvalido) {
    return setErrorMsg('Todos los sectores deben tener nombre y capacidad.');
  }

  const capacidadTotal = locacionForm.sectores.reduce((acc, cur) => acc + Number(cur.capacidad), 0);
  const stringAsientos = locacionForm.sectores.map(s => s.nombre.trim()).join(', ');

  const payload = {
    idLocacion: locacionForm.idLocacion || null, 
    nombre: locacionForm.nombre.trim(),
    direccion: locacionForm.direccion.trim(),
    capacidad: capacidadTotal,
    asientos: stringAsientos,
    
    sectores: locacionForm.sectores.map(s => {
      const sectorData = {
        nombre: s.nombre.trim(),
        capacidad: Number(s.capacidad),
        disponibles: Number(s.capacidad)
      };

      if (s.sectorId || s.idSector) {
        sectorData.sectorId = s.sectorId || s.idSector;
      }

      return sectorData;
    })
  };

  try {
    console.log("Enviando JSON a Spring Boot:", payload);
    await EventService.saveLocacion(payload);
    closeModals();
    loadData(); 
  } catch (err) {
    console.warn("Se atrapó un error en la respuesta, refrescando datos por si impactó:", err);
    closeModals();
    loadData();
  }
};


const handleEditSala = (sala) => {

  console.log("Objeto recibido en handleEditSala:", sala);
  setLocacionForm({
    idLocacion: sala.idLocacion || null,
    nombre: sala.nombre || '',
    direccion: sala.direccion || '',
    sectores: Array.isArray(sala.sectores) ? sala.sectores : []
  });
  setOpenSala(true);
};

  const handleSaveUser = async () => {
    if (
      !userForm.nombre.trim() ||
      !userForm.username.trim() ||
      !userForm.password.trim()
    ) {
      return setErrorMsg('Campos incompletos.');
    }

    await AdminService.saveUser(userForm);
    closeModals();
    loadData();
  };

  const handleSaveCat = async () => {
    if (!catForm.nombre.trim()) {
      return setErrorMsg('Nombre obligatorio.');
    }

    await EventService.saveCategoria(catForm);
    closeModals();
    loadData();
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 5 }}>
      <Typography
        variant="h4"
        sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: 'bold' }}
      >
        Panel Administrativo
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, v) => {
          setTab(v);
          setErrorMsg('');
        }}
        sx={{
          mb: 3,
          bgcolor: theme.palette.background.paper,
          borderRadius: '12px',
        }}
        textColor="inherit"
      >
        <Tab label="Eventos" />
        <Tab label="Salas" />
        <Tab label="Usuarios" />
        <Tab label="Categorías" />
      </Tabs>

      {/* TABS */}
      {tab === 0 && (
        <EventsTab
          events={events}
          onNew={() => {
            setEventForm({
              id_evento: null,
              nombre: '',
              fechaStr: '',
              horaStr: '',
              descripcion: '',
              locacionId: '',
            });
            setOpenEvent(true);
          }}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {tab === 1 && (
        <SalasTab
          salas={locaciones}
          onNew={() => {
            setLocacionForm({ idLocacion: null, nombre: '', direccion: '', sectores: [] });
            setOpenSala(true);
          }}
          onEdit={(salaSeleccionada) => handleEditSala(salaSeleccionada)}
          onDelete={handleDeleteSala}
        />
      )}

      {tab === 2 && (
        <UsersTab
          users={users}
          onNew={() => {
            setUserForm({ id: null, nombre: '', username: '', password: '' });
            setOpenUser(true);
          }}
          onEdit={(u) => {
            setUserForm(u);
            setOpenUser(true);
          }}
          onDelete={handleDeleteUser}
        />
      )}

      {tab === 3 && (
        <CategoriasTab
          categorias={categorias}
          onNew={() => {
            setCatForm({
              id: null,
              nombre: '',
              precioBase: 1000,
              color: theme.palette.primary.main,
            });
            setOpenCat(true);
          }}
          onEdit={(c) => {
            setCatForm(c);
            setOpenCat(true);
          }}
          onDelete={handleDeleteCategoria}
        />
      )}

      {/* MODALS */}
      <EventDialog
        open={openEvent}
        onClose={closeModals}
        form={eventForm}
        setForm={setEventForm}
        onSave={handleSaveEvent}
        errorMsg={errorMsg}
        locaciones={locaciones}
      />

      <SalaDialog
        open={openSala}
        onClose={closeModals}
        form={locacionForm}
        setForm={setLocacionForm}
        onSave={handleSaveSala}
        errorMsg={errorMsg}
        categorias={categorias}
      />

      <UserDialog
        open={openUser}
        onClose={closeModals}
        form={userForm}
        setForm={setUserForm}
        onSave={handleSaveUser}
        errorMsg={errorMsg}
      />

      <CategoriaDialog
        open={openCat}
        onClose={closeModals}
        form={catForm}
        setForm={setCatForm}
        onSave={handleSaveCat}
        errorMsg={errorMsg}
      />
    </Container>
  );
};

export default AdminPanel;
