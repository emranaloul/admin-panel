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

import { ReactNode, useEffect } from 'react';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout, ControllerType, DispatchFunction } from 'context';

function DashboardLayout({ children }: { children: ReactNode }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller as ControllerType;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch as DispatchFunction, 'dashboard');
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: 'relative',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

export default DashboardLayout;
