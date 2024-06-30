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

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import { baseProperties } from 'assets/theme/base/typography';

interface DataTableBodyCellProps {
  children: React.ReactNode;
  noBorder?: boolean;
  align?: 'left' | 'right' | 'center';
}

function DataTableBodyCell({ noBorder = false, align = 'left', children }: DataTableBodyCellProps) {
  return (
    <MDBox
      component='td'
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        fontSize: baseProperties.fontSizeSM,
        borderBottom: noBorder ? 'none' : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display='inline-block'
        width='max-content'
        color='text'
        sx={{ verticalAlign: 'middle' }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

export default DataTableBodyCell;
