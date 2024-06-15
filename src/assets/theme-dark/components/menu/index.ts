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
import boxShadows from 'assets/theme-dark/base/boxShadows';
import colors from 'assets/theme-dark/base/colors';
import borders from 'assets/theme-dark/base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import { baseProperties } from 'assets/theme/base/typography';
import { ComponentType } from 'types';

const { md } = boxShadows;
const { text, background } = colors;
const { borderRadius } = borders;

const menu: ComponentType<'MuiMenu'> = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: md,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: baseProperties.fontSizeSM,
      color: text.primary,
      textAlign: 'left',
      backgroundColor: `${background.paper} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;
