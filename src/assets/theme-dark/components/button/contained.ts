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

// Material Dashboard 2 React Base Styles
import colors from 'assets/theme-dark/base/colors';

// Material Dashboard 2 React Helper Functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import { baseProperties } from 'assets/theme/base/typography';

const { white, text, info, secondary } = colors;

const contained = {
  base: {
    backgroundColor: white.main,
    minHeight: pxToRem(37),
    color: text.primary,
    padding: `${pxToRem(9)} ${pxToRem(24)}`,

    '&:hover': {
      backgroundColor: white.main,
    },

    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
    },

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(29),
    padding: `${pxToRem(6)} ${pxToRem(18)}`,
    fontSize: baseProperties.fontSizeXS,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(44),
    padding: `${pxToRem(12)} ${pxToRem(64)}`,
    fontSize: baseProperties.fontSizeSM,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: info.main,

    '&:hover': {
      backgroundColor: info.main,
    },

    '&:focus:not(:hover)': {
      backgroundColor: info.dark,
    },
  },

  secondary: {
    backgroundColor: secondary.main,

    '&:hover': {
      backgroundColor: secondary.main,
    },

    '&:focus:not(:hover)': {
      backgroundColor: secondary.dark,
    },
  },
};

export default contained;
