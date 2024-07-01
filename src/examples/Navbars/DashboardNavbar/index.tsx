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

import { useState, useEffect, MouseEvent, useRef } from 'react';

// react-router components
import { useLocation } from 'react-router-dom';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';

// Material Dashboard 2 React example components
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles';

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
  ControllerType,
  DispatchFunction,
} from 'context';
import { Divider, Theme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import MDTypography from 'components/MDTypography';
import { useDispatch } from 'react-redux';
import { logout } from 'store/auth';
import { AccountBalanceOutlined, AccountCircle } from '@mui/icons-material';

interface DashboardNavbarProps {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}
function DashboardNavbar({ absolute, light, isMini }: DashboardNavbarProps) {
  const [navbarType, setNavbarType] = useState<
    'relative' | 'fixed' | 'absolute' | 'static' | 'sticky' | undefined
  >();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } =
    controller as ControllerType;
  const [openMenu, setOpenMenu] = useState<Element>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [openList, setOpenList] = useState<boolean>(false);
  const route = useLocation().pathname.split('/').slice(1);
  const dropdownRef = useRef<HTMLDivElement>();
  const appDispatch = useDispatch();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch as DispatchFunction,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch as DispatchFunction, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch as DispatchFunction, !openConfigurator);
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
    setOpenMenu(event.target as Element);
  const handleCloseMenu = () => setOpenMenu(undefined);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      // anchorReference={u}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title='Check new messages' />
      <NotificationItem icon={<Icon>podcasts</Icon>} title='Manage Podcast sessions' />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title='Payment successfully completed' />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }: Theme) => ({
    color: () => {
      let colorValue: string = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.primary, 0.6) : text.primary;
      }

      return colorValue;
    },
  });
  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color='inherit' mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon='home' title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label='Search here' />
            </MDBox>
            <MDBox color={light ? 'white' : 'inherit'} display={'flex'}>
              <MDBox boxSizing={'border-box'} position={'relative'} ref={dropdownRef}>
                <IconButton
                  sx={navbarIconButton}
                  size='small'
                  disableRipple
                  onClick={() => setOpenList((currentState) => !currentState)}
                >
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
                {openList && (
                  <MDBox
                    position={'absolute'}
                    top={30}
                    right={0}
                    bgColor={darkMode ? 'dark' : 'white'}
                    width={'15rem'}
                    borderRadius={'5px'}
                    padding={1}
                    className='h-fit overflow-y-auto flex flex-col items-start'
                    // borderColor={'grey'}
                    border={'2px solid #f0f2f5'}
                  >
                    <MDTypography className=' text-center px-1 capitalize'>
                      <AccountCircle fontSize='large' />
                      hello{' '}
                      <MDTypography component={'strong'}>{user?.email.split('@')[0]}</MDTypography>
                    </MDTypography>
                    <Divider
                      sx={{ bgcolor: !darkMode ? 'black' : 'white' }}
                      className='w-full my-0 h-1'
                    />
                    <IconButton onClick={() => appDispatch(logout())} className='p-0 m-0'>
                      <Icon sx={iconsStyle}>logout</Icon>
                      logout
                    </IconButton>
                  </MDBox>
                )}
              </MDBox>
              {/* <Link to='/authentication/sign-in/basic'>
              </Link> */}
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize='medium'>
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                aria-controls='notification-menu'
                aria-haspopup='true'
                // variant='contained'
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavbar;
