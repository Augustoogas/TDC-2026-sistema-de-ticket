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

const UsersTab = ({ users, onEdit, onNew, onDelete }) => {
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
        Nuevo Usuario
      </Button>

      <Table sx={s.tableContainer}>
        <TableBody>
        {users.map((u, index) => (
          <TableRow key={u.id || u.idUsuario || u.usuarioId || index} sx={s.tableRow}>
            <TableCell sx={s.tableText}>
              {u.nombre || 'Sin Nombre'} ({u.email || u.correo || u.username || 'sin-email'})
              </TableCell>
              
              <TableCell align="right" sx={s.actionCell}>
                <IconButton color="primary" onClick={() => onEdit(u)}>
                  <EditIcon />
                  </IconButton>
                  
                  <IconButton color="error" onClick={() => onDelete(u.id || u.idUsuario || u.usuarioId)}>
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

export default UsersTab;
