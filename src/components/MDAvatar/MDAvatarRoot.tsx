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
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { CSSObject, styled } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { baseProperties } from 'assets/theme/base/typography';
import { AvatarOwnerState } from 'types';

interface CustomAvatarProps extends AvatarProps {
  ownerState: AvatarOwnerState;
}

export default styled(Avatar)<CustomAvatarProps>(({ theme, ownerState }): CSSObject => {
  const { palette, functions, typography, boxShadows } = theme;
  const { shadow, bgColor, size } = ownerState;

  const { gradients, transparent, white } = palette;
  const { pxToRem, linearGradient } = functions;
  const { fontWeightRegular } = typography as TypographyOptions;

  // backgroundImage value
  const backgroundValue =
    bgColor === 'transparent'
      ? transparent.main
      : linearGradient(
          gradients[bgColor as keyof typeof gradients].main,
          gradients[bgColor as keyof typeof gradients].state
        );

  // size value
  let sizeValue;

  switch (size) {
    case 'xs':
      sizeValue = {
        width: pxToRem(24),
        height: pxToRem(24),
        fontSize: baseProperties.fontSizeXS,
      };
      break;
    case 'sm':
      sizeValue = {
        width: pxToRem(36),
        height: pxToRem(36),
        fontSize: baseProperties.fontSizeSM,
      };
      break;
    case 'lg':
      sizeValue = {
        width: pxToRem(58),
        height: pxToRem(58),
        fontSize: baseProperties.fontSizeSM,
      };
      break;
    case 'xl':
      sizeValue = {
        width: pxToRem(74),
        height: pxToRem(74),
        fontSize: baseProperties.fontSizeMD,
      };
      break;
    case 'xxl':
      sizeValue = {
        width: pxToRem(110),
        height: pxToRem(110),
        fontSize: baseProperties.fontSizeMD,
      };
      break;
    default: {
      sizeValue = {
        width: pxToRem(48),
        height: pxToRem(48),
        fontSize: baseProperties.fontSizeMD,
      };
    }
  }

  return {
    background: backgroundValue,
    color: white.main,
    fontWeight: fontWeightRegular,
    boxShadows: boxShadows[shadow as keyof typeof boxShadows],
    ...sizeValue,
  };
});
