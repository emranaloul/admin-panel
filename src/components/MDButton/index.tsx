/**
=========================================================
* Material Dashboard 2 React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
// Custom styles for MDButton
import MDButtonRoot from 'components/MDButton/MDButtonRoot';

// Material Dashboard 2 React contexts
import { ControllerType, useMaterialUIController } from 'context';
import { ButtonProps } from '@mui/material';
import { OwnerColorType, VariantType } from 'types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Spinner from 'components/Spinner';
// type VariantType = 'text' | 'contained' | 'outlined' | 'gradient';

type CustomButtonProps = Omit<ButtonProps, 'color' | 'variant'> & {
  iconOnly?: boolean;
  circular?: boolean;
  color?: OwnerColorType;
  variant?: VariantType;
  isLoading?: boolean;
};

export type MDButtonTypeMap = {
  props: CustomButtonProps;
  defaultComponent: 'button';
};

const MDButton = forwardRef(
  (
    {
      color = 'white' as const,
      variant = 'contained',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      isLoading,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller as ControllerType;
    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        color='primary'
        variant={
          (variant as VariantType) === 'gradient'
            ? 'contained'
            : (variant as Exclude<VariantType, 'gradient'>)
        }
        size={size}
        ownerState={{
          color,
          variant,
          size,
          circular,
          iconOnly,
          darkMode,
        }}
      >
        {isLoading ? <Spinner size={size} /> : children}
      </MDButtonRoot>
    );
  }
) as OverridableComponent<MDButtonTypeMap>;

// Setting default values for the props of MDButton
export default MDButton;
