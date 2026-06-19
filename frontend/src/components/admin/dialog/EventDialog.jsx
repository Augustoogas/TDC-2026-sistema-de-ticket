import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Box,
  Button,
  Alert,
  MenuItem,
  useTheme,
} from '@mui/material';
import { getAdminStyles } from '../../../styles/adminStyles';

const EventDialog = ({ open, onClose, form, setForm, onSave, errorMsg, locaciones }) => {
  const theme = useTheme();
  const styles = getAdminStyles(theme);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
console.log("locaciones:", locaciones);
console.log("locacionId:", form.locacionId); 
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle sx={styles.dialogPaper}>Evento</DialogTitle>

      <DialogContent sx={{ ...styles.dialogPaper, pb: 0 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Nombre"
            fullWidth
            sx={styles.inputStyle}
            value={form.nombre}
            onChange={(e) => updateField('nombre', e.target.value)}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="date"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={styles.inputStyle}
              value={form.fechaStr}
              onChange={(e) => updateField('fechaStr', e.target.value)}
            />

            <TextField
              type="time"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={styles.inputStyle}
              value={form.horaStr}
              onChange={(e) => updateField('horaStr', e.target.value)}
            />
          </Box>

          <TextField
            select
            label="Locación"
            fullWidth
            sx={styles.inputStyle}
            value={form.locacionId}
            onChange={(e) => updateField('locacionId', e.target.value)}
          >
            {locaciones.map((locacion) => (
              <MenuItem key={locacion.idLocacion} value={locacion.idLocacion}>
                {locacion.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Descripción"
            multiline
            rows={3}
            fullWidth
            sx={styles.inputStyle}
            value={form.descripcion}
            onChange={(e) => updateField('descripcion', e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ ...styles.dialogPaper, ...styles.centeredActions }}>
        <Button onClick={onClose} variant="outlined" sx={styles.secondaryButton}>
          Cancelar
        </Button>
        <Button onClick={onSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
