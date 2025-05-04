import {
  DispatchFunction,
  setMiniSidenav,
  setOpenConfigurator,
  useMaterialUIController,
} from 'context';
import Configurator from 'examples/Configurator';
import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Sidenav from 'examples/Sidenav';
import { Navigate, Outlet } from 'react-router-dom';
import { ControllerType } from '../../context';
import { useState } from 'react';
import routes from 'routes';
import brandWhite from 'assets/images/logo-ct.png';
import brandDark from 'assets/images/logo-ct-dark.png';
import MDBox from 'components/MDBox';
import { Box, Icon } from '@mui/material';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const AuthenticatedLayout = () => {
  const [controller, dispatch] = useMaterialUIController();
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const {
    miniSidenav,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller as ControllerType;

  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch as DispatchFunction, !openConfigurator);
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

  if (!loggedIn) {
    return <Navigate to={'/authentication'} />;
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName='Material Dashboard 2'
          routes={routes.find((item) => item.key === 'main')?.collapse ?? []}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
        {configsButton}
      </>
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};
export default AuthenticatedLayout;
