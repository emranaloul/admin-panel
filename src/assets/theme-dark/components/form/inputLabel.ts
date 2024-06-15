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
import { baseProperties } from 'assets/theme/base/typography';

const { text, info } = colors;

const inputLabel = {
  styleOverrides: {
    root: {
      fontSize: baseProperties.fontSizeSM,
      color: text.primary,
      lineHeight: 0.9,

      '&.Mui-focused': {
        color: info.main,
      },

      '&.MuiInputLabel-shrink': {
        lineHeight: 1.5,
        fontSize: baseProperties.fontSizeMD,

        '~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend': {
          fontSize: '0.85em',
        },
      },
    },

    sizeSmall: {
      fontSize: baseProperties.fontSizeXS,
      lineHeight: 1.625,

      '&.MuiInputLabel-shrink': {
        lineHeight: 1.6,
        fontSize: baseProperties.fontSizeSM,

        '~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend': {
          fontSize: '0.72em',
        },
      },
    },
  },
};

export default inputLabel;
