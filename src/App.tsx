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

import { useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React example components
import Sidenav from 'examples/Sidenav';
import Configurator from 'examples/Configurator';

// Material Dashboard 2 React themes
import theme from 'assets/theme';
import themeRTL from 'assets/theme/theme-rtl';

// Material Dashboard 2 React Dark Mode themes
import themeDark from 'assets/theme-dark';
import themeDarkRTL from 'assets/theme-dark/theme-rtl';

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Material Dashboard 2 React routes
import routes from 'routes';

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
  ControllerType,
  DispatchFunction,
} from 'context';
import React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';

// Images
import brandWhite from 'assets/images/logo-ct.png';
import brandDark from 'assets/images/logo-ct-dark.png';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { AppRoute } from 'types';
import GlobalSnackbar from 'components/GlobalSnackbar';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getUserData } from 'store/auth';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
// import MDBox from "./components/MDBox";
// import MDBox from "components/MDBox";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const dispatchApp = useDispatch<AppDispatch>();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller as ControllerType;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { loggedIn, isLoading } = useSelector((state: RootState) => state.auth);
  // const { pathname } = useLocation();
  console.log('🚀 ~ App ~ pathname:', pathname);
  // Cache for the rtl
  const cacheRtl = useMemo(
    () =>
      createCache({
        key: 'rtl',
        stylisPlugins: [rtlPlugin],
      }),

    // setRtlCache(cacheRtl)
    []
  );

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch as DispatchFunction, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch as DispatchFunction, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch as DispatchFunction, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname]);

  const getRoutes = useCallback(
    (allRoutes: AppRoute[]): ReactNode =>
      allRoutes.map((route) => {
        const redirectComponent = <Navigate to={'/'} />;
        if (route.collapse) {
          return getRoutes(route.collapse);
        }
        if (route.route) {
          return (
            <Route
              path={route.route}
              element={loggedIn === route.auth ? route.component : redirectComponent}
              key={route.key}
            />
          );
        }
        return null;
      }),
    [loggedIn]
  );

  useEffect(() => {
    dispatchApp(getUserData());
  }, []);

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
      <Box position={'fixed'} />
    </MDBox>
  );

  if (isLoading) {
    return <Loader />;
  }

  return direction === 'rtl' ? (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <GlobalSnackbar />
        <CssBaseline />
        {layout === 'dashboard' && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName='Material Dashboard 2'
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === 'vr' && <Configurator />}
        <Routes>
          <Route
            path='/'
            element={<Navigate to={`${loggedIn ? '/dashboard' : '/authentication/sign-in'}`} />}
          />
          {!isLoading && getRoutes(routes)}
          <Route path='/load' element={<Loader />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <GlobalSnackbar />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName='Material Dashboard 2'
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <Routes>
        <Route
          path='/'
          element={<Navigate to={`${loggedIn ? '/dashboard' : '/authentication/sign-in'}`} />}
        />
        {!isLoading && getRoutes(routes)}
        <Route path='/load' element={<Loader />} />
      </Routes>
    </ThemeProvider>
  );
}
