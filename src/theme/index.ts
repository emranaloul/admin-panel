/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme } from '@mui/material/styles';
import borders from 'assets/theme/base/borders';
import boxShadows from 'assets/theme/base/boxShadows';
import colors from 'assets/theme/base/colors';
import typography from 'assets/theme/base/typography';
import boxShadow from 'assets/theme/functions/boxShadow';
import hexToRgb from 'assets/theme/functions/hexToRgb';
import linearGradient from 'assets/theme/functions/linearGradient';
import pxToRem from 'assets/theme/functions/pxToRem';
import rgba from 'assets/theme/functions/rgba';
type ColorsType = typeof colors;
declare module '@mui/material/styles' {
  interface Palette extends ColorsType {}
  interface PaletteOptions extends ColorsType {}

  interface Theme {
    functions: {
      linearGradient: typeof linearGradient;
      boxShadow: typeof boxShadow;
      hexToRgb: typeof hexToRgb;
      pxToRem: typeof pxToRem;
      rgba: typeof rgba;
    };
    borders: typeof borders;
    typography: typeof typography;
    boxShadows: typeof boxShadows;
    hexToRgb: typeof hexToRgb;
    pxToRem: typeof pxToRem;
    rgba: typeof rgba;
  }
  interface ThemeOptions {
    functions?: {
      linearGradient?: typeof linearGradient;
      boxShadow: typeof boxShadow;
      hexToRgb: typeof hexToRgb;
      pxToRem: typeof pxToRem;
      rgba: typeof rgba;
    };
    typography?: typeof typography;
    borders?: typeof borders;
    boxShadows?: typeof boxShadows;
  }
}
const theme = createTheme({
  palette: {
    ...colors,
  },
  functions: {
    linearGradient,
    boxShadow,
    hexToRgb,
    pxToRem,
    rgba,
  },
  borders,
  boxShadows,
});

export default theme;
