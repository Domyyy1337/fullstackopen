import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '1.8rem'
    },
    h3: {
      fontSize: '1.5rem'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
