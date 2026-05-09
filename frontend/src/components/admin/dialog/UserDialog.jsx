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

const UserDialog = ({ open, onClose, form, setForm, onSave, errorMsg }) => {
  const theme = useTheme();
  const styles = getAdminStyles(theme);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
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
      <DialogTitle sx={styles.dialogPaper}>Usuario</DialogTitle>

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
            label="Username"
            fullWidth
            sx={styles.inputStyle}
            value={form.username}
            onChange={(e) => updateField('username', e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={styles.inputStyle}
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
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

export default UserDialog;
