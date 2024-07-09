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

// Custom styles for the MDBadge
import MDBadgeRoot from 'components/MDBadge/MDBadgeRoot';
import { BadgeProps } from '@mui/material';

interface MDBadgeProps extends Omit<BadgeProps, 'color' | 'variant'> {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  variant: 'gradient' | 'contained';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  children?: React.ReactNode;
  container?: boolean;
}
const MDBadge = forwardRef<HTMLSpanElement, MDBadgeProps>(
  (
    {
      color = 'info',
      size = 'sm',
      circular,
      indicator,
      border,
      container,
      children,
      variant = 'gradient',
      ...rest
    },
    ref
  ) => {
    return (
      <MDBadgeRoot
        color='default'
        {...rest}
        ownerState={{
          color,
          variant,
          size,
          circular,
          indicator,
          border,
          container,
          children,
        }}
        ref={ref}
      >
        {children}
      </MDBadgeRoot>
    );
  }
);

export default MDBadge;
