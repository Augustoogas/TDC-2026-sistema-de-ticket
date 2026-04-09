import React from 'react';
import { Paper, Typography, Tooltip } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';

const Seat = ({ id, status, onToggle, customColor }) => {
  const isOccupied = status === 'occupied';
  const isSelected = status === 'selected';


  const getBgColor = () => {
    if (isOccupied) return 'grey.400';
    if (isSelected) return 'primary.main'; 
    return customColor; 
  };

  return (
    <Tooltip title={isOccupied ? "Ocupado" : `Asiento ${id}`}>
      <Paper
        elevation={isSelected ? 6 : 1}
        onClick={() => !isOccupied && onToggle(id)}
        sx={{
          width: 45,
          height: 45,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isOccupied ? 'not-allowed' : 'pointer',
          borderRadius: '8px 8px 15px 15px',
          transition: '0.3s all ease',
          // APLICACIÓN DE COLORES
          bgcolor: getBgColor(),
          color: isSelected ? 'white' : (isOccupied ? 'grey.600' : 'black'),
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.1)',
          '&:hover': {
            transform: isOccupied ? 'none' : 'scale(1.1)',
            filter: isOccupied ? 'none' : 'brightness(1.2)',
          }
        }}
      >
        <ChairIcon fontSize="small" />
        <Typography variant="caption" sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
          {id}
        </Typography>
      </Paper>
    </Tooltip>
  );
};

export default Seat;