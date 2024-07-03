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

// @mui material components
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Custom styles for the MDSnackbar
import MDSnackbarIconRoot from 'components/MDSnackbar/MDSnackbarIconRoot';

// Material Dashboard 2 React context
import { ControllerType, useMaterialUIController } from 'context';
import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { baseProperties } from 'assets/theme/base/typography';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { ColorType } from 'types';

interface MDSnackbarProps extends SnackbarProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
  icon?: ReactNode;
  title: string;
  dateTime?: string;
  close: () => void;
  bgWhite?: boolean;
}

function MDSnackbar({
  color = 'info',
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite,
  ...rest
}: MDSnackbarProps) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller as ControllerType;

  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = 'dark';
    dividerColor = false;
  } else if (color === 'light') {
    titleColor = darkMode ? 'inherit' : 'dark';
    dateTimeColor = darkMode ? 'inherit' : 'text';
    dividerColor = false;
  } else {
    titleColor = 'white';
    dateTimeColor = 'white';
    dividerColor = true;
  }
  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      {...rest}
      action={
        <IconButton size='small' aria-label='close' color='inherit' onClick={close}>
          <Icon fontSize='small'>close</Icon>
        </IconButton>
      }
    >
      <MDBox
        variant={bgWhite ? 'contained' : 'gradient'}
        bgColor={bgWhite ? 'white' : color}
        minWidth='21.875rem'
        maxWidth='100%'
        shadow='md'
        borderRadius='md'
        p={1}
        sx={{
          backgroundColor: ({ palette }) => {
            if (darkMode) {
              return palette.background.paper;
            }
            if (color) {
              return palette[color].main;
            }
            return palette.primary.main;
          },
        }}
      >
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          color='dark'
          p={1.5}
        >
          <MDBox display='flex' alignItems='center' lineHeight={0}>
            <MDSnackbarIconRoot fontSize='small' ownerState={{ color, bgWhite }}>
              {icon}
            </MDSnackbarIconRoot>
            <MDTypography
              variant='button'
              fontWeight='medium'
              color={titleColor as ColorType}
              sx={({ palette: { white } }: Theme) => ({
                color: white.main,
              })}
              textGradient={bgWhite}
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox display='flex' alignItems='center' lineHeight={0}>
            <MDTypography
              variant='caption'
              color={dateTimeColor as ColorType}
              sx={({ palette: { white } }: Theme) => ({
                color: white.main,
              })}
            >
              {dateTime}
            </MDTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }: Theme) =>
                  (bgWhite && !darkMode) || color === 'light' ? dark.main : white.main,
                fontWeight: ({
                  typography: { fontWeightBold },
                }: Theme & { typography: TypographyOptions }) => fontWeightBold,
                cursor: 'pointer',
                marginLeft: 2,
                transform: 'translateY(-1px)',
              }}
              onClick={close}
            >
              close
            </Icon>
          </MDBox>
        </MDBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <MDBox p={1.5}>
          <MDTypography
            sx={{
              fontSize: baseProperties.fontSizeSM,
              color: ({ palette: { white } }) => white.main,
            }}
          >
            {content}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Snackbar>
  );
}
export default MDSnackbar;
