import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, Button, Box, Tabs, Tab, TextField, 
  Dialog, DialogTitle, DialogContent, DialogActions, Stack, MenuItem, IconButton, Alert 
} from '@mui/material';
import { AdminService, EventService } from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AdminPanel = () => {
  const [tab, setTab] = useState(0);
  const [teatros, setTeatros] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [openTeatro, setOpenTeatro] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const [teatroForm, setTeatroForm] = useState({ id: null, nombre: '', filas: [] });
  const [eventForm, setEventForm] = useState({ id_evento: null, nombre: '', fechaStr: '', horaStr: '', descripcion: '', imagen: '', teatroId: '' });  
  const [userForm, setUserForm] = useState({ id: null, nombre: '', username: '', password: '' });
  const [catForm, setCatForm] = useState({ id: null, nombre: '', precioBase: 1000, color: '#ffffff' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [t, e, u, c] = await Promise.all([
      EventService.getTeatros(), EventService.getAllEvents(),
      AdminService.getUsers(), EventService.getCategorias()
    ]);
    setTeatros(t); setEvents(e); setUsers(u); setCategorias(c);
  };

  const closeModals = () => {
    setOpenEvent(false); setOpenTeatro(false); setOpenUser(false); setOpenCat(false);
    setErrorMsg('');
  };
  
const handleEditEvent = (e) => {

  const parseFechaAmigable = (texto) => {
    if (!texto || !texto.includes(' de ')) return '';
    try {
      const meses = { 
        enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
        julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12' 
      };
      const partes = texto.split(' '); 
      const dia = partes[1].padStart(2, '0');
      const mes = meses[partes[3].toLowerCase()];
      const anio = 2026; 
      return `${anio}-${mes}-${dia}`; 
    } catch (err) { 
      return ''; 
    }
  };

  
  const parseHoraAmigable = (texto) => {
    if (!texto || !texto.includes('-')) return '';
    const match = texto.match(/(\d{2}:\d{2})/); 
    return match ? match[1] : '';
  };

  let idEncontrado = e.teatroId || e.id_teatro || '';

  if (!idEncontrado && teatros.length > 0) {
    const coincidencia = teatros.find(t => 
      e.nombre.toLowerCase().includes(t.nombre.toLowerCase())
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
    teatroId: idEncontrado 
  });

  setOpenEvent(true); 
};

  const handleSaveEvent = async () => {
    setErrorMsg('');
    if (!eventForm.nombre?.trim() || !eventForm.fechaStr || !eventForm.horaStr || !eventForm.teatroId || !eventForm.descripcion?.trim()) {
      return setErrorMsg("Error: Todos los campos son obligatorios (incluida la descripción).");
    }
    const fechaSel = new Date(`${eventForm.fechaStr}T${eventForm.horaStr}`);
    if (fechaSel < new Date()) return setErrorMsg("Error: La fecha no puede ser anterior a la actual.");
    
    await EventService.saveEvent(eventForm);
    closeModals(); loadData();
  };

  // MODIFICACIÓN SOLICITADA: Validación estricta de Sala
  const handleSaveTeatro = async () => {
    setErrorMsg('');

    if (!teatroForm.nombre.trim()) {
      return setErrorMsg("El nombre de la sala es obligatorio.");
    }

    if (teatroForm.filas.length === 0) {
      return setErrorMsg("La sala debe tener al menos una fila configurada.");
    }

    // Valida que cada fila tenga categoría y asientos > 0
    const filasSinCategoria = teatroForm.filas.some(f => !f.categoriaId);
  if (filasSinCategoria) {
    return setErrorMsg("Todas las filas deben tener una categoría asignada.");
  }

    await EventService.saveTeatro(teatroForm);
    closeModals(); loadData();
  };

  const handleSaveUser = async () => {
    if (!userForm.nombre.trim() || !userForm.username.trim() || !userForm.password.trim()) return setErrorMsg("Campos incompletos.");
    await AdminService.saveUser(userForm);
    closeModals(); loadData();
  };

  const handleSaveCat = async () => {
    if (!catForm.nombre.trim()) return setErrorMsg("Nombre obligatorio.");
    await EventService.saveCategoria(catForm);
    closeModals(); loadData();
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 5 }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>Panel Administrativo SITU</Typography>
      
      <Tabs value={tab} onChange={(e, v) => { setTab(v); setErrorMsg(''); }} sx={{ mb: 3, bgcolor: '#1a1a1a' }} textColor="inherit">
        <Tab label="Eventos" />
        <Tab label="Salas" />
        <Tab label="Usuarios" />
        <Tab label="Categorías" />
      </Tabs>

      {tab === 0 && (
        <Paper sx={{ p: 3, bgcolor: '#1a1a1a', color: 'white' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEventForm({id_evento: null,nombre:'', fechaStr:'', horaStr:'', descripcion:'', teatroId:''}); setOpenEvent(true); }} sx={{ mb: 2, bgcolor: '#800020' }}>Nuevo Evento</Button>
          <Table><TableHead><TableRow><TableCell sx={{color:'grey.500'}}>Evento</TableCell><TableCell align="right" sx={{color:'grey.500'}}>Acciones</TableCell></TableRow></TableHead>
          <TableBody>{events.map(e => (<TableRow key={e.id_evento}><TableCell sx={{color:'white'}}>{e.nombre}</TableCell>
            <TableCell align="right"><IconButton color="primary" onClick={() => handleEditEvent(e)}><EditIcon /></IconButton><IconButton color="error" onClick={() => EventService.deleteEvent(e.id_evento).then(loadData)}><DeleteIcon /></IconButton></TableCell></TableRow>))}</TableBody></Table>
        </Paper>
      )}

      {tab === 1 && (
        <Paper sx={{ p: 3, bgcolor: '#1a1a1a', color: 'white' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setTeatroForm({id:null, nombre:'', filas:[]}); setOpenTeatro(true); }} sx={{ mb: 2, bgcolor: '#800020' }}>Nueva Sala</Button>
          <Table><TableHead><TableRow><TableCell sx={{color:'grey.500'}}>Sala</TableCell><TableCell align="right" sx={{color:'grey.500'}}>Acciones</TableCell></TableRow></TableHead>
          <TableBody>{teatros.map(t => (<TableRow key={t.id}><TableCell sx={{color:'white'}}>{t.nombre}</TableCell>
            <TableCell align="right"><IconButton color="primary" onClick={() => {setTeatroForm(t); setOpenTeatro(true);}}><EditIcon /></IconButton>
            <IconButton color="error" onClick={() => EventService.deleteTeatro(t.id).then(loadData)}><DeleteIcon /></IconButton></TableCell></TableRow>))}</TableBody></Table>
        </Paper>
      )}

      {tab === 2 && (
        <Paper sx={{ p: 3, bgcolor: '#1a1a1a', color: 'white' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setUserForm({id:null, nombre:'', username:'', password:''}); setOpenUser(true); }} sx={{ mb: 2, bgcolor: '#800020' }}>Nuevo Usuario</Button>
          <Table><TableBody>{users.map(u => (<TableRow key={u.id}><TableCell sx={{color:'white'}}>{u.nombre} ({u.username})</TableCell>
            <TableCell align="right"><IconButton color="primary" onClick={() => {setUserForm(u); setOpenUser(true);}}><EditIcon /></IconButton>
            <IconButton color="error" onClick={() => AdminService.deleteUser(u.id).then(loadData)}><DeleteIcon /></IconButton></TableCell></TableRow>))}</TableBody></Table>
        </Paper>
      )}

      {tab === 3 && (
        <Paper sx={{ p: 3, bgcolor: '#1a1a1a', color: 'white' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setCatForm({id:null, nombre:'', precioBase:1000, color:'#ffffff'}); setOpenCat(true); }} sx={{ mb: 2, bgcolor: '#800020' }}>Nueva Categoría</Button>
          <Table><TableBody>{categorias.map(c => (<TableRow key={c.id}><TableCell sx={{color:'white'}}>{c.nombre} (${c.precioBase})</TableCell>
            <TableCell align="right"><IconButton color="primary" onClick={() => {setCatForm(c); setOpenCat(true);}}><EditIcon /></IconButton>
            <IconButton color="error" onClick={() => EventService.deleteCategoria(c.id).then(loadData)}><DeleteIcon /></IconButton></TableCell></TableRow>))}</TableBody></Table>
        </Paper>
      )}

      {/* MODAL EVENTO */}
      <Dialog open={openEvent} onClose={closeModals} fullWidth>
        <DialogTitle sx={{bgcolor:'#111', color:'white'}}>Evento</DialogTitle>
        <DialogContent sx={{bgcolor:'#111', color:'white'}}>
          {errorMsg && <Alert severity="error" sx={{mb:2}}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{mt:1}}>
            <TextField label="Nombre" fullWidth sx={{bgcolor:'#222', input:{color:'white'}}} value={eventForm.nombre} onChange={e => setEventForm({...eventForm, nombre: e.target.value})} />
            <Box sx={{display:'flex', gap:2}}>
              <TextField label="Fecha" type="date" fullWidth InputLabelProps={{shrink:true}} sx={{bgcolor:'#222', input:{color:'white'}}} value={eventForm.fechaStr} onChange={e => setEventForm({...eventForm, fechaStr: e.target.value})} />
              <TextField label="Hora" type="time" fullWidth InputLabelProps={{shrink:true}} sx={{bgcolor:'#222', input:{color:'white'}}} value={eventForm.horaStr} onChange={e => setEventForm({...eventForm, horaStr: e.target.value})} />
            </Box>
            <TextField select label="Sala" fullWidth sx={{bgcolor:'#222', "& .MuiSelect-select":{color:'white'}}} value={eventForm.teatroId} onChange={e => setEventForm({...eventForm, teatroId: e.target.value})}>
              {teatros.map(t => <MenuItem key={t.id} value={t.id}>{t.nombre}</MenuItem>)}
            </TextField>
            <TextField label="Descripción" multiline rows={3} fullWidth sx={{bgcolor:'#222', "& .MuiInputBase-input":{color:'white'}}} value={eventForm.descripcion} onChange={e => setEventForm({...eventForm, descripcion: e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{bgcolor:'#111'}}><Button onClick={handleSaveEvent} variant="contained">Guardar</Button></DialogActions>
      </Dialog>

      {/* MODAL SALA (CON VALIDACIÓN DE FILAS Y ASIENTOS) */}
      <Dialog open={openTeatro} onClose={closeModals} fullWidth maxWidth="md">
        <DialogTitle sx={{bgcolor:'#111', color:'white'}}>Gestionar Sala</DialogTitle>
        <DialogContent sx={{bgcolor:'#111', color:'white'}}>
          {errorMsg && <Alert severity="error" sx={{mb:2}}>{errorMsg}</Alert>}
          <TextField label="Nombre de Sala" fullWidth sx={{bgcolor:'#222', mb:2, mt:1, input:{color:'white'}}} value={teatroForm.nombre} onChange={e => setTeatroForm({...teatroForm, nombre: e.target.value})} />
          
          {teatroForm.filas.map((f, i) => (
            <Stack key={i} direction="row" spacing={1} sx={{mb:1, alignItems:'center'}}>
              <TextField select label="Categoría" size="small" sx={{bgcolor:'#333', flex:1, "& .MuiSelect-select":{color:'white'}}} value={f.categoriaId || ''} 
                onChange={e => {
                  const sel = categorias.find(c => c.id === e.target.value);
                  const newFilas = [...teatroForm.filas];
                  newFilas[i] = { ...newFilas[i], categoriaId: sel.id, nombre: sel.nombre, precio: sel.precioBase, color: sel.color };
                  setTeatroForm({...teatroForm, filas: newFilas});
                }}>
                {categorias.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>)}
              </TextField>
              <TextField 
                label="Asientos" 
                type="number" 
                size="small" 
                inputProps={{ min: 1 }}
                sx={{bgcolor:'#333', width:100, input:{color:'white'}}} 
                value={f.asientos} 
                onChange={e => {
                  const val = parseInt(e.target.value);
                  const c = [...teatroForm.filas]; 
                  c[i].asientos = isNaN(val) || val < 1 ? 1 : val;
                  setTeatroForm({...teatroForm, filas: c});
                }} 
              />
              <IconButton color="error" onClick={() => {
                const filtered = teatroForm.filas.filter((_, idx) => idx !== i);
                setTeatroForm({...teatroForm, filas: filtered});
              }}><DeleteIcon /></IconButton>
            </Stack>
          ))}
          <Button onClick={() => setTeatroForm({...teatroForm, filas: [...teatroForm.filas, {letra: String.fromCharCode(65+teatroForm.filas.length), categoriaId:'', asientos:10}]})}>+ Añadir Fila</Button>
        </DialogContent>
        <DialogActions sx={{bgcolor:'#111'}}><Button onClick={handleSaveTeatro} variant="contained">Guardar Sala</Button></DialogActions>
      </Dialog>

      {/* MODAL USUARIO */}
      <Dialog open={openUser} onClose={closeModals} fullWidth>
        <DialogTitle sx={{bgcolor:'#111', color:'white'}}>Usuario</DialogTitle>
        <DialogContent sx={{bgcolor:'#111', color:'white'}}>
          {errorMsg && <Alert severity="error" sx={{mb:2}}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{mt:1}}>
            <TextField label="Nombre" fullWidth sx={{bgcolor:'#222', input:{color:'white'}}} value={userForm.nombre} onChange={e => setUserForm({...userForm, nombre: e.target.value})} />
            <TextField label="Username" fullWidth sx={{bgcolor:'#222', input:{color:'white'}}} value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})} />
            <TextField label="Password" type="password" fullWidth sx={{bgcolor:'#222', input:{color:'white'}}} value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{bgcolor:'#111'}}><Button onClick={handleSaveUser} variant="contained">Guardar</Button></DialogActions>
      </Dialog>

      {/* MODAL CATEGORIA */}
      <Dialog open={openCat} onClose={closeModals}>
        <DialogTitle sx={{bgcolor:'#111', color:'white'}}>Categoría</DialogTitle>
        <DialogContent sx={{bgcolor:'#111', color:'white'}}>
          {errorMsg && <Alert severity="error" sx={{mb:2}}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{mt:1}}>
            <TextField label="Nombre" fullWidth sx={{bgcolor:'#222', input:{color:'white'}}} value={catForm.nombre} onChange={e => setCatForm({...catForm, nombre: e.target.value})} />
            <TextField label="Precio" type="number" fullWidth slotProps={{htmlInput: { min: 0 }}} sx={{bgcolor:'#222', input:{color:'white'}}} value={catForm.precioBase} onChange={e => {const val = parseInt(e.target.value);setCatForm({...catForm, precioBase: isNaN(val) ? 0 : val});}} />
            <TextField type="color" fullWidth sx={{bgcolor:'#222', height:45}} value={catForm.color} onChange={e => setCatForm({...catForm, color: e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{bgcolor:'#111'}}><Button onClick={handleSaveCat} variant="contained">Guardar</Button></DialogActions>
      </Dialog>

    </Container>
  );
};

export default AdminPanel;