import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import { getAdminStyles } from '../../../styles/adminStyles';

const CategoriaDialog = ({ open, onClose, form, setForm, onSave, errorMsg }) => {
  const theme = useTheme();
  const styles = getAdminStyles(theme);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 350,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle sx={styles.dialogPaper}>Categoría</DialogTitle>

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

          <TextField
            label="Precio"
            type="number"
            fullWidth
            sx={styles.inputStyle}
            value={form.precioBase}
            onChange={(e) =>
              updateField('precioBase', parseInt(e.target.value) || 0)
            }
          />

          <TextField
            type="color"
            fullWidth
            sx={styles.inputStyle}
            value={form.color}
            onChange={(e) => updateField('color', e.target.value)}
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

export default CategoriaDialog;
