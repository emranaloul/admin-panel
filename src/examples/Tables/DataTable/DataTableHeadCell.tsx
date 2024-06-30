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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React contexts
import { ControllerType, useMaterialUIController } from 'context';
import { baseProperties } from 'assets/theme/base/typography';
import { Theme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, 'none', 'asce', 'desc']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

interface DataTableHeadCellProps {
  width: string | number;
  children: ReactNode;
  sorted: false | 'none' | 'asce' | 'desc';
  align: 'left' | 'right' | 'center';
}

function DataTableHeadCell({
  width = 'auto',
  children,
  sorted = 'none',
  align = 'left',
  ...rest
}: DataTableHeadCellProps) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller as ControllerType;

  return (
    <MDBox
      component='th'
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        {...rest}
        position='relative'
        textAlign={align}
        color={darkMode ? 'white' : 'secondary'}
        opacity={0.7}
        sx={({ typography: { fontWeightBold } }: Theme & { typography: TypographyOptions }) => ({
          fontSize: baseProperties.fontSizeXXS,
          fontWeight: fontWeightBold,
          textTransform: 'uppercase',
          cursor: sorted ? 'pointer' : undefined,
          userSelect: sorted ? 'none' : undefined,
        })}
      >
        {children}
        {sorted && (
          <MDBox
            position='absolute'
            top={0}
            right={align !== 'right' ? '16px' : 0}
            left={align === 'right' ? '-5px' : 'unset'}
            sx={() => ({
              fontSize: baseProperties.fontSizeLG,
            })}
          >
            <MDBox
              position='absolute'
              top={-6}
              color={sorted === 'asce' ? 'text' : 'secondary'}
              opacity={sorted === 'asce' ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </MDBox>
            <MDBox
              position='absolute'
              top={0}
              color={sorted === 'desc' ? 'text' : 'secondary'}
              opacity={sorted === 'desc' ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

export default DataTableHeadCell;
