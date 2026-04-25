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

const EventsTab = ({ events, onEdit, onNew, onDelete }) => {
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
        Nuevo Evento
      </Button>

      <Table sx={s.tableContainer}>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id_evento} sx={s.tableRow}>
              <TableCell sx={s.tableText}>{e.nombre}</TableCell>

              <TableCell align="right" sx={s.actionCell}>
                <IconButton color="primary" onClick={() => onEdit(e)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(e.id_evento)}>
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

export default EventsTab;
