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

// Custom styles for MDBox
import MDBoxRoot from './MDBoxRoot';
import { BoxProps } from '@mui/material';
import { BoxOwnerState } from 'types';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type MDBoxBaseProps = BoxProps & BoxOwnerState;

export type MDButtonTypeMap = {
  props: MDBoxBaseProps;
  defaultComponent: 'div';
};
const MDBox = forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'transparent',
      color = 'dark',
      opacity = 1,
      borderRadius = 'none',
      shadow = 'none',
      coloredShadow = 'none',
      ...rest
    },
    ref
  ) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
) as OverridableComponent<MDButtonTypeMap>;

export default MDBox;
