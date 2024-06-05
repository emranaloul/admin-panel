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

// Material Dashboard 2 React base styles
import boxShadows from 'assets/theme/base/boxShadows';
import { baseProperties } from 'assets/theme/base/typography';
import colors from 'assets/theme/base/colors';
import borders from 'assets/theme/base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme/functions/pxToRem';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import { Theme } from '@emotion/react';

const { lg } = boxShadows;
const { text, white } = colors;
const { borderRadius } = borders;

const menu: {
  defaultProps?: ComponentsProps['MuiMenu'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiMenu'];
} = {
  defaultProps: {
    disableAutoFocusItem: true,
  },
  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: lg,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: baseProperties.fontSizeSM,
      color: text.primary,
      textAlign: 'left',
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;
