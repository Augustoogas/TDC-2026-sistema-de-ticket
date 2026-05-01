import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#F5F360',
      contrastText: '#091417',
    },

    secondary: {
      main: '#7C8A8F',
    },

    background: {
      default: '#091417',
      paper: '#0f1d20',
    },

    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
    },

    divider: 'rgba(255,255,255,0.15)',

    custom: {
      footerBorder: 'rgba(255,255,255,0.8)',
      cardBorder: 'rgba(255,255,255,0.8)',
      cardShadow: 'rgba(0,0,0,0.45)',
      appBarBg: 'rgba(9, 20, 23, 0.75)',
      appBarBorder: 'rgba(255,255,255,0.05)',
      seatColors: {
        platea: '#4eb667',
        palcos: '#ff4500',
        pullman: '#1e90ff',
      },
    },
  },

  typography: {
    fontFamily: `'Lato', 'Roboto', sans-serif`,

    h1: { fontFamily: `'Manrope', sans-serif`, fontWeight: 800 },
    h2: { fontFamily: `'Manrope', sans-serif`, fontWeight: 700 },
    h3: { fontFamily: `'Manrope', sans-serif`, fontWeight: 600 },
    h4: { fontFamily: `'Manrope', sans-serif`, fontWeight: 600 },
    h5: { fontFamily: `'Manrope', sans-serif`, fontWeight: 600 },

    body1: { fontFamily: `'Lato', sans-serif` },
    body2: { fontFamily: `'Lato', sans-serif` },

    button: {
      fontFamily: `'Manrope', sans-serif`,
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: theme.palette.background.default,
          fontFamily: theme.typography.fontFamily,
        },
      }),
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 18,
          backgroundImage: 'none',
          border: `1px solid ${theme.palette.custom.cardBorder}`,

          transition: 'all 0.25s ease',
          willChange: 'transform',

          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: `0 12px 30px ${theme.palette.custom.cardShadow}`,
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          padding: '10px 18px',
          fontFamily: theme.typography.button.fontFamily,
          transition: 'background-color 0.2s ease',
        }),

        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,

          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.6),
          },
        }),
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: 10,
        }),
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: 'none',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.custom.appBarBg,
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.custom.appBarBorder}`,
        }),
      },
    },
  },
});

export default theme;
