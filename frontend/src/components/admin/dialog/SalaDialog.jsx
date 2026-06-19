import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  Alert,
  IconButton
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const SalaDialog = ({
  open,
  onClose,
  form,
  setForm,
  onSave,
  errorMsg
}) => {

  // 🟢 Actualiza propiedades raíz como 'nombre' o 'direccion'
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // 🟢 Agrega un sector vacío respetando SectorDTO
  const handleAddSector = () => {
    setForm((prev) => ({
      ...prev,
      sectores: [
        ...(prev.sectores || []),
        { sectorId: null, nombre: '', capacidad: 0 }
      ]
    }));
  };

  // 🟢 Modifica dinámicamente campos internos de un sector sin mutar el estado
  const handleSectorChange = (index, field, value) => {
    setForm((prev) => {
      const nuevosSectores = (prev.sectores || []).map((sector, i) => {
        if (i === index) {
          return { ...sector, [field]: value };
        }
        return sector;
      });
      return { ...prev, sectores: nuevosSectores };
    });
  };

  // 🟢 Borra un sector usando filter de forma segura
  const handleDeleteSector = (index) => {
    setForm((prev) => ({
      ...prev,
      sectores: (prev.sectores || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Gestionar Locación
      </DialogTitle>

      <DialogContent>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={form.nombre || ''}
            onChange={(e) => updateField('nombre', e.target.value)}
          />

          <TextField
            label="Dirección"
            fullWidth
            value={form.direccion || ''}
            onChange={(e) => updateField('direccion', e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={handleAddSector}
          >
            + Agregar Sector
          </Button>

          {(form.sectores || []).map((sector, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <TextField
                label="Nombre Sector"
                fullWidth
                value={sector.nombre || ''}
                onChange={(e) => handleSectorChange(index, 'nombre', e.target.value)}
              />

              <TextField
                type="number"
                label="Capacidad"
                fullWidth
                value={sector.capacidad || 0}
                onChange={(e) => handleSectorChange(index, 'capacidad', parseInt(e.target.value) || 0)}
              />

              <IconButton
                color="error"
                onClick={() => handleDeleteSector(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalaDialog;