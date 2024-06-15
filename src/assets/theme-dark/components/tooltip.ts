/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Fade from '@mui/material/Fade';

// Material Dashboard 2 React base styles
import colors from 'assets/theme-dark/base/colors';
import typography from 'assets/theme-dark/base/typography';
import borders from 'assets/theme-dark/base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import { ComponentType } from 'types';
import { baseProperties } from 'assets/theme/base/typography';

const { black, white } = colors;
const { fontWeightRegular } = typography;
const { borderRadius } = borders;

const tooltip: ComponentType<'MuiTooltip'> = {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      maxWidth: pxToRem(200),
      backgroundColor: black.main,
      color: white.main,
      fontSize: baseProperties.fontSizeSM,
      fontWeight: fontWeightRegular,
      textAlign: 'center',
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
    },

    arrow: {
      color: black.main,
    },
  },
};

export default tooltip;
