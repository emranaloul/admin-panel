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

// Material Dashboard 2 React helper functions
import rgba from 'assets/theme-dark/functions/rgba';
import { baseProperties } from 'assets/theme/base/typography';

const { white } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: baseProperties.fontSizeMD,
      color: rgba(white.main, 0.8),
    },
  },
};

export default dialogContentText;
