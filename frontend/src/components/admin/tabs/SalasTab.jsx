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

const SalasTab = ({ salas, onEdit, onNew, onDelete }) => {
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
        Nueva Sala
      </Button>

      <Table sx={s.tableContainer}>
        <TableBody>
          {salas.map((t) => (
            <TableRow key={t.id} sx={s.tableRow}>
              <TableCell sx={s.tableText}>{t.nombre}</TableCell>

              <TableCell align="right" sx={s.actionCell}>
                <IconButton color="primary" onClick={() => onEdit(t)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(t.id)}>
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

export default SalasTab;
