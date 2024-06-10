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

import { forwardRef, createContext, useContext, useMemo, ReactNode } from 'react';

// prop-types is a library for typechecking of props
import PropTypes, { string } from 'prop-types';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Custom styles for MDPagination
import MDPaginationItemRoot from 'components/MDPagination/MDPaginationItemRoot';
import { ColorType, SizeType, VariantType } from 'types';
import { ButtonPropTypes } from 'components/MDButton';

// The Pagination main context
const Context = createContext<{ variant?: VariantType; color?: ColorType; size?: SizeType }>({
  variant: 'gradient',
  color: 'info',
  size: 'medium',
});

interface MDPaginationProps {
  item?: boolean;
  variant?: VariantType;
  color?: ColorType;
  size?: SizeType;
  active?: boolean;
}

const MDPagination = forwardRef<HTMLButtonElement, ButtonPropTypes & MDPaginationProps>(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;

    const value = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    return (
      <Context.Provider value={value}>
        {item ? (
          <MDPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? (context.variant as Exclude<VariantType, 'gradient'>) : 'outlined'}
            color={active ? context.color : 'secondary'}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </MDPaginationItemRoot>
        ) : (
          <MDBox
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            sx={{ listStyle: 'none' }}
          >
            {children}
          </MDBox>
        )}
      </Context.Provider>
    );
  }
);

export default MDPagination;
