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
import { CSSObject, Color, CssBaselineProps, Palette, PaletteColor } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { CSSInterpolation, styled } from '@mui/material/styles';
import { TypographyOptions, Variant } from '@mui/material/styles/createTypography';
import { CSSProperties, ReactNode } from 'react';

type OwnerState = Partial<CssBaselineProps> & {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'text'
    | 'white';
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  verticalAlign?:
    | 'unset'
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'middle'
    | 'top'
    | 'bottom';
  textGradient?: boolean;
  opacity?: number;
  children?: ReactNode;
  display?: string;
  variant?: Variant;
  pl?: number;
  mt?: number;
  darkMode?: boolean;
};
interface CustomTypographyProps extends TypographyProps {
  ownerState: OwnerState;
}

export default styled(Typography)<CustomTypographyProps>(({ theme, ownerState }): CSSObject => {
  const { palette, typography, functions } = theme;
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient, darkMode } =
    ownerState;

  const { gradients, transparent, white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } =
    typography as TypographyOptions;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== 'inherit' &&
      color !== 'text' &&
      color !== 'white' &&
      gradients[color as keyof typeof gradients]
        ? linearGradient(
            gradients[color as keyof typeof gradients].main,
            gradients[color as keyof typeof gradients].state
          )
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: 'inline-block',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: transparent.main,
    position: 'relative',
    zIndex: 1,
  });

  // color value
  let colorValue: string | undefined;
  if (darkMode) {
    if (color === 'inherit' || !palette[color as keyof Palette]) {
      colorValue = 'inherit';
    } else if (color === 'dark') {
      colorValue = white.main;
    }
  } else {
    colorValue = palette[color as keyof Palette]
      ? (palette[color as keyof Palette] as PaletteColor).main
      : color;
  }

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: 'none',
    color: colorValue,
    fontWeight:
      fontWeights[fontWeight as keyof typeof fontWeights] &&
      fontWeights[fontWeight as keyof typeof fontWeights],
    ...(textGradient && gradientStyles()),
    position: 'inherit',
  };
});
