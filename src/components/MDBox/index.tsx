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

import { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { forwardRef } from 'react';

// prop-types is a library for typechecking of props

// Custom styles for MDBox
import MDBoxRoot from './MDBoxRoot';
import { BoxProps } from '@mui/material';
import { BoxOwnerState } from 'types';
import { NavLink, NavLinkProps } from 'react-router-dom';

type MDBoxBaseProps = BoxProps & BoxOwnerState;

type MDBoxImgProps = MDBoxBaseProps &
  ImgHTMLAttributes<HTMLImageElement> & {
    component: 'img';
  };
type MDBoxAnchorProps = MDBoxBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    component: 'a';
  };
type MDBoxFormProps = MDBoxBaseProps &
  AnchorHTMLAttributes<HTMLFormElement> & {
    component: 'form';
  };
type MDBoxNavLinkProps = MDBoxBaseProps &
  NavLinkProps & {
    component: typeof NavLink;
  };

type MDBoxOtherProps = MDBoxBaseProps;

type MDBoxProps =
  | MDBoxImgProps
  | MDBoxOtherProps
  | MDBoxAnchorProps
  | MDBoxNavLinkProps
  | MDBoxFormProps;

const MDBox = forwardRef(
  (
    {
      variant,
      bgColor = 'transparent',
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    }: MDBoxProps,
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
