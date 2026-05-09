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
  const [salas, setSalas] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [openSala, setOpenSala] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const [salaForm, setSalaForm] = useState({ id: null, nombre: '', filas: [] });
  const [eventForm, setEventForm] = useState({
    id_evento: null,
    nombre: '',
    fechaStr: '',
    horaStr: '',
    descripcion: '',
    imagen: '',
    salaId: '',
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
    const [s, e, u, c] = await Promise.all([
      EventService.getSalas(),
      EventService.getAllEvents(),
      AdminService.getUsers(),
      EventService.getCategorias(),
    ]);
    setSalas(s);
    setEvents(e);
    setUsers(u);
    setCategorias(c);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [s, e, u, c] = await Promise.all([
        EventService.getSalas(),
        EventService.getAllEvents(),
        AdminService.getUsers(),
        EventService.getCategorias(),
      ]);
      setSalas(s);
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
          enero: '01',
          febrero: '02',
          marzo: '03',
          abril: '04',
          mayo: '05',
          junio: '06',
          julio: '07',
          agosto: '08',
          septiembre: '09',
          octubre: '10',
          noviembre: '11',
          diciembre: '12',
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

    let idEncontrado = e.salaId || e.id_sala || '';

    if (!idEncontrado && salas.length > 0) {
      const coincidencia = salas.find((s) =>
        e.nombre.toLowerCase().includes(s.nombre.toLowerCase())
      );
      if (coincidencia) idEncontrado = coincidencia.id;
    }

    setEventForm({
      id_evento: e.id_evento || e.id,
      nombre: e.nombre || '',
      fechaStr: parseFechaAmigable(e.fecha || e.fechaStr || ''),
      horaStr: parseHoraAmigable(e.fecha || e.horaStr || ''),
      descripcion: e.descripcion || '',
      imagen: e.imagen || '',
      salaId: idEncontrado,
    });

    setOpenEvent(true);
  };

  const handleSaveEvent = async () => {
    setErrorMsg('');

    if (
      !eventForm.nombre?.trim() ||
      !eventForm.fechaStr ||
      !eventForm.horaStr ||
      !eventForm.salaId ||
      !eventForm.descripcion?.trim()
    ) {
      return setErrorMsg('Error: Todos los campos son obligatorios.');
    }

    const fechaSel = new Date(`${eventForm.fechaStr}T${eventForm.horaStr}`);
    if (fechaSel < new Date()) {
      return setErrorMsg('Error: La fecha no puede ser anterior a la actual.');
    }

    await EventService.saveEvent(eventForm);
    closeModals();
    loadData();
  };

  const handleSaveSala = async () => {
    setErrorMsg('');

    if (!salaForm.nombre.trim()) {
      return setErrorMsg('El nombre de la sala es obligatorio.');
    }

    if (salaForm.filas.length === 0) {
      return setErrorMsg('La sala debe tener al menos una fila.');
    }

    const filasSinCategoria = salaForm.filas.some((f) => !f.categoriaId);
    if (filasSinCategoria) {
      return setErrorMsg('Todas las filas deben tener categoría.');
    }

    await EventService.saveSala(salaForm);
    closeModals();
    loadData();
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
              salaId: '',
            });
            setOpenEvent(true);
          }}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {tab === 1 && (
        <SalasTab
          salas={salas}
          onNew={() => {
            setSalaForm({ id: null, nombre: '', filas: [] });
            setOpenSala(true);
          }}
          onEdit={(s) => {
            setSalaForm(s);
            setOpenSala(true);
          }}
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
        salas={salas}
      />

      <SalaDialog
        open={openSala}
        onClose={closeModals}
        form={salaForm}
        setForm={setSalaForm}
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
