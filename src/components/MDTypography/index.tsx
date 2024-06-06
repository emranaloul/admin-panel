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

import { ReactNode, forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for MDTypography
import MDTypographyRoot from 'components/MDTypography/MDTypographyRoot';

// Material Dashboard 2 React contexts
import { ControllerType, useMaterialUIController } from 'context';

const MDTypography = forwardRef<HTMLSpanElement, any>(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      children,
      display,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller as ControllerType;

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
        }}
      >
        {children}
      </MDTypographyRoot>
    );
  }
);

// Setting default values for the props of MDTypography
MDTypography.defaultProps = {
  color: 'dark',
  fontWeight: '',
  textTransform: 'none',
  verticalAlign: 'unset',
  textGradient: '',
  opacity: 1,
};

// Typechecking props for the MDTypography

export default MDTypography;
