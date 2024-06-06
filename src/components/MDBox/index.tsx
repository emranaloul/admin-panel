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

import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
export interface OwnerState {
  variant?: 'contained' | 'gradient';
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'none';
}
// prop-types is a library for typechecking of props

// Custom styles for MDBox
import MDBoxRoot from './MDBoxRoot';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { ResponsiveStyleValue } from '@mui/system';

const MDBox = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    }: OwnerState & {
      children?: ReactNode;
      display?: string;
      justifyContent?: string;
      alignItems?: string;
      width?: string;
      height?: string;
      bgColor?: string;
      shadow?: string;
      borderRadius?: string;
      position?:
        | ResponsiveStyleValue<CSSProperties['position']>
        | ((theme: Theme) => ResponsiveStyleValue<CSSProperties['position']>);
      right?: string;
      bottom?: string;
      zIndex?: number;
      color?: string;
      sx?: SxProps<Theme>;
      onClick?: MouseEventHandler<HTMLDivElement>;
    },
    ref
  ) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

// Setting default values for the props of MDBox
MDBox.defaultProps = {
  variant: 'contained',
  bgColor: 'transparent',
  color: 'dark',
  opacity: 1,
  borderRadius: 'none',
  shadow: 'none',
  coloredShadow: 'none',
};

export default MDBox;
