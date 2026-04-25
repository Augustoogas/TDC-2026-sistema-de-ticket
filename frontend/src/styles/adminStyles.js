export const getAdminStyles = (theme) => ({
  // ===== Dialog base =====
  dialogPaper: {
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  // ===== Inputs =====
  inputStyle: {
    bgcolor: theme.palette.background.default,
    input: { color: theme.palette.text.primary },
  },

  // ===== Buttons =====
  primaryButton: {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      bgcolor: theme.palette.primary.main,
      opacity: 0.8,
    },
  },

  secondaryButton: {
    color: theme.palette.text.primary,
    px: 4,
    '&:hover': {
      bgcolor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
  },

  // botón agregar (nuevo)
  addButton: {
    mb: 2,
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      bgcolor: theme.palette.primary.main,
      opacity: 0.8,
    },
  },

  centeredActions: {
    justifyContent: 'center',
    gap: 1,
    py: 2,
  },

  // ===== Table base =====
  tablePaper: {
    p: 3,
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  tableText: {
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  tableHeaderText: {
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  tableRow: {
    bgcolor: theme.palette.background.paper,
  },

  tableContainer: {
    bgcolor: 'transparent',
  },

  actionCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  // ===== Tabs =====
  tabContainer: {
    mb: 3,
    bgcolor: theme.palette.background.paper,
    borderRadius: '12px',
  },
});
