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

import { ReactElement, useEffect } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Material Dashboard 2 React example components
import SidenavCollapse from 'examples/Sidenav/SidenavCollapse';

// Custom styles for the Sidenav
import SidenavRoot from 'examples/Sidenav/SidenavRoot';
import sidenavLogoLabel from 'examples/Sidenav/styles/sidenav';

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  ControllerType,
  DispatchFunction,
} from 'context';
import { AppRoute, ColorType } from 'types';
import { DrawerProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

// Define the interface for the Sidenav component props
interface SidenavProps extends DrawerProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  brand?: string;
  brandName: string;
  routes: AppRoute[];
}
function Sidenav({ brand, brandName, routes, color = 'info', ...rest }: SidenavProps) {
  const [controller, dispatch] = useMaterialUIController();
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } =
    controller as ControllerType;
  const location = useLocation();
  const collapseName = location.pathname.replace('/', '');

  let textColor = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }
  const closeSidenav = () => setMiniSidenav(dispatch as DispatchFunction, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch as DispatchFunction, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch as DispatchFunction,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch as DispatchFunction,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes: (ReactElement | undefined)[] = routes.map(
    ({ type, name, icon, title, key, href, route, auth }) => {
      let returnValue;
      if (auth !== loggedIn) return;
      if (type === 'collapse') {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target='_blank'
            rel='noreferrer'
            sx={{ textDecoration: 'none' }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              // noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
          </NavLink>
        );
      } else if (type === 'title') {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor as ColorType}
            display='block'
            variant='caption'
            fontWeight='bold'
            textTransform='uppercase'
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === 'divider') {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      color={color}
      variant='permanent'
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign='center'>
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position='absolute'
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant='h6' color='secondary'>
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to='/' display='flex' alignItems='center'>
          {brand && <MDBox component='img' src={brand} alt='Brand' width='2rem' />}
          <MDBox
            width={!brandName ? '100%' : ''}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component='h6'
              variant='button'
              fontWeight='medium'
              color={textColor as ColorType}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox p={2} mt='auto'>
        <MDButton
          component='a'
          href='https://www.creative-tim.com/product/material-dashboard-pro-react'
          target='_blank'
          rel='noreferrer'
          variant='contained'
          color={sidenavColor}
          fullWidth
        >
          upgrade to pro
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

export default Sidenav;
