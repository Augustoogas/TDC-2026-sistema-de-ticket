import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getAdminStyles } from '../../../styles/adminStyles';

const CategoriasTab = ({ categorias, onEdit, onNew, onDelete }) => {
  const theme = useTheme();
  const s = getAdminStyles(theme);

  return (
    <Paper sx={s.tablePaper} elevation={0}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNew}
        sx={s.addButton}
      >
        Nueva Categoría
      </Button>

      <Table sx={s.tableContainer}>
        <TableBody>
          {categorias.map((c) => (
            <TableRow key={c.id} sx={s.tableRow}>
              <TableCell sx={s.tableText}>
                {c.nombre} (${c.precioBase})
              </TableCell>

              <TableCell align="right" sx={s.actionCell}>
                <IconButton color="primary" onClick={() => onEdit(c)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(c.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CategoriasTab;
