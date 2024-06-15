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
import colors from 'assets/theme-dark/base/colors';
import borders from 'assets/theme-dark/base/borders';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import rgba from 'assets/theme-dark/functions/rgba';
import { baseProperties } from 'assets/theme/base/typography';

const { dark, white } = colors;
const { borderRadius } = borders;

const menuItem = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: 'unset',
      padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
      borderRadius: borderRadius.md,
      fontSize: baseProperties.fontSizeSM,
      color: rgba(white.main, 0.8),
      transition: 'background-color 300ms ease, color 300ms ease',

      '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
        backgroundColor: dark.main,
        color: white.main,
      },
    },
  },
};

export default menuItem;
