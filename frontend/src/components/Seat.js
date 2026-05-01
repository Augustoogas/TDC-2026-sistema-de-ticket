import React from 'react';
import { Paper, Typography, Tooltip, useTheme, alpha } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';

const Seat = ({ id, status, onToggle, customColor }) => {
  const theme = useTheme();

  const isSelected = status === 'selected';
  const isOccupied = status === 'occupied';

  const getBgColor = () => {
    if (isOccupied) return theme.palette.grey[500];
    if (isSelected) return customColor;
    return customColor;
  };

  return (
    <Tooltip title={isOccupied ? 'Ocupado' : `Asiento ${id}`}>
      <Paper
        onClick={() => !isOccupied && onToggle(id)}
        sx={{
          width: 42,
          height: 42,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: isOccupied ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',

          bgcolor: getBgColor(),

          border: isSelected
            ? `2.5px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.divider}`,

          boxShadow: isSelected
            ? `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}, inset 0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`
            : 'none',

          opacity: isOccupied ? 0.6 : 1,

          '&:hover': {
            transform: isOccupied ? 'none' : 'scale(1.08)',
            boxShadow:
              !isOccupied && !isSelected
                ? `0 0 8px ${alpha(customColor, 0.4)}`
                : isSelected
                  ? `0 0 14px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`
                  : 'none',
          },
        }}
      >
        <ChairIcon fontSize="small" />
        <Typography sx={{ fontSize: 9, fontWeight: 600 }}>{id}</Typography>
      </Paper>
    </Tooltip>
  );
};

export default Seat;
