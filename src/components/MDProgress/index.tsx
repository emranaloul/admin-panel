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

// Material Dashboard 2 React components
import MDTypography from 'components/MDTypography';

// Custom styles for MDProgress
import MDProgressRoot from 'components/MDProgress/MDProgressRoot';
import { LinearProgress, LinearProgressProps } from '@mui/material';

interface MDProgressProps extends LinearProgressProps {
  ownerVariant?: 'contained' | 'gradient';
  ownerColor?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  value?: number;
  label?: boolean;
}
const MDProgress = forwardRef<typeof LinearProgress, MDProgressProps>(
  ({ ownerVariant = 'contained', ownerColor = 'info', value = 0, label, ...rest }, ref) => (
    <>
      {label && (
        <MDTypography variant='button' fontWeight='medium' color='text'>
          {value}%
        </MDTypography>
      )}
      <MDProgressRoot
        {...rest}
        ref={ref}
        variant='determinate'
        value={value}
        ownerState={{ color: ownerColor, value, variant: ownerVariant }}
      />
    </>
  )
);

export default MDProgress;
