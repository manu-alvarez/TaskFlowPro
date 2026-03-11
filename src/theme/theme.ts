import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F5FF', // Neon Cyan
      light: '#66FBFF',
      dark: '#00B8C2',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF00E4', // Neon Pink
      light: '#FF66F0',
      dark: '#C200AD',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#050505',
      paper: '#121212',
    },
    error: {
      main: '#FF3366',
    },
    success: {
      main: '#00FF66',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.75rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.05em' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Pill shaped buttons
          padding: '10px 24px',
        },
        containedPrimary: {
          boxShadow: '0 4px 14px 0 rgba(0, 245, 255, 0.39)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 245, 255, 0.5)',
          },
        },
        containedSecondary: {
          boxShadow: '0 4px 14px 0 rgba(255, 0, 228, 0.39)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 0, 228, 0.5)',
          },
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
          },
        },
      },
    },
  },
});
