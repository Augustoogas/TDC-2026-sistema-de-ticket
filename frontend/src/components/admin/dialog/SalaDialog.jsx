import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  Alert,
  MenuItem,
  IconButton,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAdminStyles } from '../../../styles/adminStyles';

const SalaDialog = ({
  open,
  onClose,
  form,
  setForm,
  onSave,
  errorMsg,
  categorias,
}) => {
  const theme = useTheme();
  const styles = getAdminStyles(theme);

  const updateForm = (newValues) => {
    setForm((prev) => ({ ...prev, ...newValues }));
  };

  const updateFila = (index, newFila) => {
    const copy = [...form.filas];
    copy[index] = newFila;
    updateForm({ filas: copy });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            width: 400,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle sx={styles.dialogPaper}>Gestionar Sala</DialogTitle>

      <DialogContent sx={{ ...styles.dialogPaper, pb: 0 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          label="Nombre de Sala"
          fullWidth
          sx={{ ...styles.inputStyle, mb: 2, mt: 1 }}
          value={form.nombre}
          onChange={(e) => updateForm({ nombre: e.target.value })}
        />

        {form.filas.map((f, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={1}
            sx={{ mb: 1, alignItems: 'center' }}
          >
            <TextField
              select
              size="small"
              sx={{ ...styles.inputStyle, flex: 1 }}
              value={f.categoriaId || ''}
              onChange={(e) => {
                const sel = categorias.find((c) => c.id === e.target.value);
                if (!sel) return;

                updateFila(i, {
                  ...f,
                  categoriaId: sel.id,
                  nombre: sel.nombre,
                  precio: sel.precioBase,
                  color: sel.color,
                });
              }}
            >
              {categorias.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="number"
              size="small"
              slotProps={{ htmlInput: { min: 1 } }}
              sx={{ ...styles.inputStyle, width: 100 }}
              value={f.asientos}
              onChange={(e) =>
                updateFila(i, {
                  ...f,
                  asientos: parseInt(e.target.value) || 1,
                })
              }
            />

            <IconButton
              color="error"
              onClick={() =>
                updateForm({ filas: form.filas.filter((_, idx) => idx !== i) })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}

        <Button
          onClick={() =>
            updateForm({
              filas: [
                ...form.filas,
                {
                  letra: String.fromCharCode(65 + form.filas.length),
                  categoriaId: '',
                  asientos: 10,
                },
              ],
            })
          }
        >
          + Añadir Fila
        </Button>
      </DialogContent>

      <DialogActions sx={{ ...styles.dialogPaper, ...styles.centeredActions }}>
        <Button onClick={onClose} variant="outlined" sx={styles.secondaryButton}>
          Cancelar
        </Button>
        <Button onClick={onSave} variant="contained">
          Guardar Sala
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalaDialog;
