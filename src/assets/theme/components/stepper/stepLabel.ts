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
import typography, { baseProperties } from 'assets/theme/base/typography';
import colors from 'assets/theme/base/colors';

// Material Dashboard 2 React helper functions
import pxToRem from 'assets/theme/functions/pxToRem';
import rgba from 'assets/theme/functions/rgba';

const { fontWeightRegular } = typography as TypographyOptions;
const { white } = colors;
import { Theme } from '@emotion/react';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
const stepLabel: {
  defaultProps?: ComponentsProps['MuiStepLabel'];
  styleOverrides?: ComponentsOverrides<Theme>['MuiStepLabel'];
} = {
  styleOverrides: {
    label: {
      marginTop: `${pxToRem(8)} !important`,
      fontWeight: fontWeightRegular,
      fontSize: baseProperties.fontSizeXS,
      color: '#9fc9ff',
      textTransform: 'uppercase',

      '&.Mui-active': {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${rgba(white.main, 0.8)} !important`,
      },

      '&.Mui-completed': {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${rgba(white.main, 0.8)} !important`,
      },
    },
  },
};

export default stepLabel;
