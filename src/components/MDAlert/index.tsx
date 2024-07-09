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

import { useState } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Fade from '@mui/material/Fade';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Custom styles for the MDAlert
import MDAlertRoot from 'components/MDAlert/MDAlertRoot';
import MDAlertCloseIcon from 'components/MDAlert/MDAlertCloseIcon';
import { AlertProps } from '@mui/material';

interface MDAlertProps extends Omit<AlertProps, 'color'> {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  dismissible?: boolean;
  children: React.ReactNode;
}

function MDAlert({ color = 'info', dismissible, children, ...rest }: MDAlertProps) {
  const [alertStatus, setAlertStatus] = useState('mount');

  const handleAlertStatus = () => setAlertStatus('fadeOut');

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display='flex' alignItems='center' color='white'>
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? () => handleAlertStatus : undefined}>
            &times;
          </MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === 'mount':
      return alertTemplate();
    case alertStatus === 'fadeOut':
      setTimeout(() => setAlertStatus('unmount'), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

export default MDAlert;
