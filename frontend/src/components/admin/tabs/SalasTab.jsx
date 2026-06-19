import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  IconButton,
  useTheme
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
        Nueva Locación
      </Button>

      <Table sx={s.tableContainer}>
        <TableBody>
          {Array.isArray(salas) && salas.map((itemSala) => (
            <TableRow
              key={itemSala.idLocacion || itemSala.id}
              sx={s.tableRow}
            >
              <TableCell sx={s.tableText}>
                {itemSala.nombre}
              </TableCell>

              <TableCell sx={s.tableText}>
                {itemSala.direccion}
              </TableCell>

              <TableCell align="right" sx={s.actionCell}>
                <IconButton
                  color="primary"
                  onClick={() => {
                    console.log("Enviando desde el botón del hijo:", itemSala);
                    onEdit(itemSala);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(itemSala.idLocacion || itemSala.id)}
                >
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