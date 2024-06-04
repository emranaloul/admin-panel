// src/theme/index.ts

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    functions: {
      linearGradient: (color1: string, color2: string) => string;
    };
    borders: {
      borderRadius: string;
    };
    boxShadows: {
      colored: string;
    };
  }
  interface ThemeOptions {
    functions?: {
      linearGradient?: (color1: string, color2: string) => string;
    };
    borders?: {
      borderRadius?: string;
    };
    boxShadows?: {
      colored?: string;
    };
  }
}

const theme = createTheme({
  functions: {
    linearGradient: (color1, color2) => `linear-gradient(${color1}, ${color2})`,
  },
  borders: {
    borderRadius: '8px',
  },
  boxShadows: {
    colored: '0px 4px 6px rgba(0,0,0,0.1)',
  },
});

export default theme;
