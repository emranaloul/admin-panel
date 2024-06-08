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

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props

// Custom styles for MDInput
import MDInputRoot from 'components/MDInput/MDInputRoot';
import { TextFieldProps } from '@mui/material';

interface MDInputProps {
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const MDInput = forwardRef<HTMLInputElement, TextFieldProps & MDInputProps>(
  ({ error, success, disabled, ...rest }, ref) => (
    <MDInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
  )
);

export default MDInput;
