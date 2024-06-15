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
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

interface MDProgressProps {
  variant?: 'contained' | 'gradient';
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  value?: number;
  label?: boolean;
}

export default styled(LinearProgress)<{ ownerState: MDProgressProps }>(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;

  const { text, gradients } = palette;
  const { linearGradient } = functions;

  // background value
  let backgroundValue;

  if (variant === 'gradient') {
    backgroundValue =
      color && gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state)
        : linearGradient(gradients.info.main, gradients.info.state);
  } else {
    backgroundValue = color && palette[color] ? palette[color].main : palette.info.main;
  }

  return {
    '& .MuiLinearProgress-bar': {
      background: backgroundValue,
      width: `${value}%`,
      color: text.primary,
    },
  };
});
