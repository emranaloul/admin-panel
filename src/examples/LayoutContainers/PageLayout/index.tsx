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

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout, DispatchFunction } from 'context';

interface PageLayoutProps {
  background?: 'white' | 'light' | 'default';
  children: ReactNode;
}

function PageLayout({ background = 'default', children }: PageLayoutProps) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch as DispatchFunction, 'page');
  }, [pathname]);

  return (
    <MDBox
      width='100vw'
      height='100%'
      minHeight='100vh'
      bgColor={background}
      sx={{ overflowX: 'hidden' }}
    >
      {children}
    </MDBox>
  );
}

export default PageLayout;
