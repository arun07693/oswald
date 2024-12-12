// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // Replace with your desired color
//     },
//     success: {
//       main: '#4caf50', // Replace with your desired color
//     },
//     text: {
//       secondary: '#757575', // Example color
//     },
//     action: {
//       disabled: '#9e9e9e', // Fallback color for disabled actions
//     },
//   },

// });

// export default theme;
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    success: {
      main: '#4caf50',
    },
    text: {
      secondary: '#757575',
    },
    action: {
      disabled: 'rgba(158, 158, 158, 0.5)', // Use directly
    },
    divider: '#e0e0e0',
    background: {
      default: '#ffffff',
      paper: `rgba(255, 255, 255, 0.4)`, // Reuse `paper` for your custom value
    },
  },
});

export default theme;
