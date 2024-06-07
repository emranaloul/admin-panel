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

import {
  AnchorHTMLAttributes,
  CSSProperties,
  ImgHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';

// prop-types is a library for typechecking of props

// Custom styles for MDBox
import MDBoxRoot from './MDBoxRoot';
import { BoxProps, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { ResponsiveStyleValue } from '@mui/system';
import { BoxOwnerState } from 'types';

type MDBoxBaseProps = BoxProps &
  BoxOwnerState & {
    component?: string;
  };

type MDBoxImgProps = MDBoxBaseProps &
  ImgHTMLAttributes<HTMLImageElement> & {
    component: 'img';
  };
type MDBoxAmchorProps = MDBoxBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    component: 'a';
  };

type MDBoxOtherProps = MDBoxBaseProps & {
  component?: string;
};

type MDBoxProps = MDBoxImgProps | MDBoxOtherProps | MDBoxAmchorProps;

const MDBox = forwardRef(
  (
    { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }: MDBoxProps,
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
