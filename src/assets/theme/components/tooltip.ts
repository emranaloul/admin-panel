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
import colors from 'assets/theme/base/colors';
import typography, { baseProperties } from 'assets/theme/base/typography';
import borders from 'assets/theme/base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme/functions/pxToRem';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import { Theme } from '@emotion/react';

const { black, light } = colors;
const { fontWeightRegular } = typography as TypographyOptions;
const { borderRadius } = borders;

const tooltip: {
  defaultProps?: ComponentsProps['MuiTooltip'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiTooltip'];
} = {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      maxWidth: pxToRem(200),
      backgroundColor: black.main,
      color: light.main,
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
