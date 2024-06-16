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
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import { baseProperties } from 'assets/theme/base/typography';

type OwnerStateProps = {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
  bgWhite?: boolean;
};
export default styled(Icon)<{ ownerState: OwnerStateProps }>(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, bgWhite } = ownerState;

  const { white, transparent, gradients } = palette;
  const { pxToRem, linearGradient } = functions;

  // backgroundImage value
  let backgroundImageValue;

  if (bgWhite) {
    backgroundImageValue =
      color && gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state)
        : linearGradient(gradients.info.main, gradients.info.state);
  } else if (color === 'light') {
    backgroundImageValue = linearGradient(gradients.dark.main, gradients.dark.state);
  }

  return {
    backgroundImage: backgroundImageValue,
    WebkitTextFillColor: bgWhite || color === 'light' ? transparent.main : white.main,
    WebkitBackgroundClip: 'text',
    marginRight: pxToRem(8),
    fontSize: baseProperties.fontSizeLG,
    transform: `translateY(${pxToRem(-2)})`,
  };
});
