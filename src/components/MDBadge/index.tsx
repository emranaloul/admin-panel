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
import { ColorType } from 'types';

interface MDBadgeProps extends BadgeProps {
  color?: ColorType;
  ownerVariant: 'gradient' | 'contained';
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
      ownerVariant = 'gradient',
      ...rest
    },
    ref
  ) => (
    <MDBadgeRoot
      {...rest}
      ownerState={{
        color,
        variant: ownerVariant,
        size,
        circular,
        indicator,
        border,
        container,
        children,
      }}
      ref={ref}
      color='default'
    >
      {children}
    </MDBadgeRoot>
  )
);

export default MDBadge;
