import React from 'react';
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

const UsuariosTab = ({ users, onEdit, onNew, onDelete }) => {
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
          {users.map((u) => (
            <TableRow key={u.id} sx={s.tableRow}>
              <TableCell sx={s.tableText}>
                {u.nombre} ({u.username})
              </TableCell>

              <TableCell align="right" sx={s.actionCell}>
                <IconButton color="primary" onClick={() => onEdit(u)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(u.id)}>
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

export default UsuariosTab;
