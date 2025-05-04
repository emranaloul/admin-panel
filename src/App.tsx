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

import { useEffect, useMemo } from 'react';

// react-router components
import { Routes, Route, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Dashboard 2 React components

// Material Dashboard 2 React example components

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
import { useMaterialUIController, ControllerType } from 'context';
import rtlPlugin from 'stylis-plugin-rtl';

// Images
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import GlobalSnackbar from 'components/GlobalSnackbar';
import { AppDispatch } from 'store';
import { getUserData } from 'store/auth';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
import { useAppSelector } from 'store/hooks';

export default function App() {
  const [controller] = useMaterialUIController();
  const dispatchApp = useDispatch<AppDispatch>();
  const { direction, darkMode } = controller as ControllerType;
  const { pathname } = useLocation();
  const { isLoading } = useAppSelector((state) => state.auth);

  const cacheRtl = useMemo(
    () =>
      createCache({
        key: 'rtl',
        stylisPlugins: [rtlPlugin],
      }),

    // setRtlCache(cacheRtl)
    []
  );

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

  useEffect(() => {
    dispatchApp(getUserData());
  }, []);

  if (isLoading) {
    return <Loader active />;
  }
  return direction === 'rtl' ? (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <GlobalSnackbar />
        <Loader active={isLoading} />
        <CssBaseline />
        <Routes>
          {routes.map((route) => (
            <Route element={route.component} path={route.route} key={route.key}>
              {route.collapse?.map((nestedRoute) => (
                <Route
                  index={nestedRoute.index}
                  key={nestedRoute.key}
                  element={nestedRoute.component}
                  path={!nestedRoute.index ? nestedRoute.route : undefined}
                />
              ))}
            </Route>
          ))}
          <Route path='*' element={<h2 className='text-center'>not found</h2>} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Loader active={isLoading} />
      <GlobalSnackbar />
      <Routes>
        {routes.map((route) => (
          <Route element={route.component} path={route.route} key={route.key}>
            {route.collapse?.map((nestedRoute) => (
              <Route
                errorElement={<h2 className='text-center'>error</h2>}
                index={nestedRoute.index}
                key={nestedRoute.key}
                element={nestedRoute.component}
                path={!nestedRoute.index ? nestedRoute.route : undefined}
              />
            ))}
          </Route>
        ))}
        <Route path='*' element={<h2 className='text-center'>not found</h2>} />
      </Routes>
    </ThemeProvider>
  );
}
