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
import borders from 'assets/theme-dark/base/borders';

// Material Dashboard 2 React Helper Functions
import rgba from 'assets/theme-dark/functions/rgba';
import { baseProperties } from 'assets/theme/base/typography';

const { info, inputBorderColor, dark, grey, white } = colors;
const { borderWidth } = borders;

const input = {
  styleOverrides: {
    root: {
      fontSize: baseProperties.fontSizeSM,
      color: dark.main,

      '&:hover:not(.Mui-disabled):before': {
        borderBottom: `${borderWidth[1]} solid ${rgba(inputBorderColor, 0.6)}`,
      },

      '&:before': {
        borderColor: rgba(inputBorderColor, 0.6),
      },

      '&:after': {
        borderColor: info.main,
      },

      input: {
        color: white.main,

        '&::-webkit-input-placeholder': {
          color: grey[100],
        },
      },
    },
  },
};

export default input;
