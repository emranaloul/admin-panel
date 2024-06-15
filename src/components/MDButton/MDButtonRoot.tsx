/* eslint-disable prefer-destructuring */
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
import Button, { ButtonProps } from '@mui/material/Button';
import { Palette, PaletteColor, TypeAction, styled } from '@mui/material/styles';
import { MDButtonProps } from 'types';

interface CustomButtonProps extends ButtonProps {
  ownerState: MDButtonProps & { darkMode: boolean };
}

export default styled(Button)<CustomButtonProps>(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const { ownerColor, ownerVariant, size, circular, iconOnly, darkMode } = ownerState;

  const { white, text, transparent, gradients, grey } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius } = borders;
  const { colored } = boxShadows;
  const shadowColor = (palette[ownerColor as keyof Palette] as PaletteColor)?.main;

  // styles for the button with variant="contained"
  const containedStyles = () => {
    // background color value
    const backgroundValue = palette[ownerColor as keyof Palette] ? shadowColor : white.main;

    // backgroundColor value when button is focused
    const focusedBackgroundValue = palette[ownerColor as keyof Palette]
      ? (palette[ownerColor as keyof Palette] as TypeAction).focus
      : white.focus;

    // boxShadow value
    const boxShadowValue = colored[ownerColor as keyof typeof colored]
      ? `${boxShadow([0, 3], [3, 0], shadowColor, 0.15)}, ${boxShadow(
          [0, 3],
          [1, -2],
          shadowColor,
          0.2
        )}, ${boxShadow([0, 1], [5, 0], shadowColor, 0.15)}`
      : 'none';

    // boxShadow value when button is hovered
    const hoveredBoxShadowValue = colored[ownerColor as keyof typeof colored]
      ? `${boxShadow([0, 14], [26, -12], shadowColor, 0.4)}, ${boxShadow(
          [0, 4],
          [23, 0],
          shadowColor,
          0.15
        )}, ${boxShadow([0, 8], [10, -5], shadowColor, 0.2)}`
      : 'none';

    // color value
    let colorValue: string = white.main;

    if (
      !darkMode &&
      (ownerColor === 'white' || ownerColor === 'light' || !palette[ownerColor as keyof Palette])
    ) {
      colorValue = text.primary;
    } else if (
      darkMode &&
      (ownerColor === 'white' || ownerColor === 'light' || !palette[ownerColor as keyof Palette])
    ) {
      colorValue = grey[600];
    }

    // color value when button is focused
    let focusedColorValue: string = white.main;

    if (ownerColor === 'white') {
      focusedColorValue = text.primary;
    } else if (ownerColor === 'primary' || ownerColor === 'error' || ownerColor === 'dark') {
      focusedColorValue = white.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,

      '&:hover': {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },

      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: palette[ownerColor as keyof Palette]
          ? boxShadow([0, 0], [0, 3.2], shadowColor, 0.5)
          : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
      },

      '&:disabled': {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };

  // styles for the button with variant="outlined"
  const outliedStyles = () => {
    // background color value
    const backgroundValue = ownerColor === 'white' ? rgba(white.main, 0.1) : transparent.main;

    // color value
    const colorValue = palette[ownerColor as keyof Palette]
      ? (palette[ownerColor as keyof Palette] as PaletteColor).main
      : white.main;

    // boxShadow value
    const boxShadowValue = palette[ownerColor as keyof Palette]
      ? boxShadow(
          [0, 0],
          [0, 3.2],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.5
        )
      : boxShadow([0, 0], [0, 3.2], white.main, 0.5);

    // border color value
    let borderColorValue = palette[ownerColor as keyof Palette]
      ? (palette[ownerColor as keyof Palette] as PaletteColor).main
      : rgba(white.main, 0.75);

    if (ownerColor === 'white') {
      borderColorValue = rgba(white.main, 0.75);
    }

    return {
      background: backgroundValue,
      color: colorValue,
      borderColor: borderColorValue,

      '&:hover': {
        background: transparent.main,
        borderColor: colorValue,
      },

      '&:focus:not(:hover)': {
        background: transparent.main,
        boxShadow: boxShadowValue,
      },

      '&:active:not(:hover)': {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85,
      },

      '&:disabled': {
        color: colorValue,
        borderColor: colorValue,
      },
    };
  };

  // styles for the button with variant="gradient"
  const gradientStyles = () => {
    // background value
    const backgroundValue =
      ownerColor === 'white' || !gradients[ownerColor as keyof typeof gradients]
        ? white.main
        : linearGradient(
            gradients[ownerColor as keyof typeof gradients].main,
            gradients[ownerColor as keyof typeof gradients].state
          );

    // boxShadow value
    const boxShadowValue = colored[ownerColor as keyof typeof colored]
      ? `${boxShadow(
          [0, 3],
          [3, 0],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.15
        )}, ${boxShadow(
          [0, 3],
          [1, -2],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.2
        )}, ${boxShadow(
          [0, 1],
          [5, 0],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.15
        )}`
      : 'none';

    // boxShadow value when button is hovered
    const hoveredBoxShadowValue = colored[ownerColor as keyof typeof colored]
      ? `${boxShadow(
          [0, 14],
          [26, -12],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.4
        )}, ${boxShadow(
          [0, 4],
          [23, 0],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.15
        )}, ${boxShadow(
          [0, 8],
          [10, -5],
          (palette[ownerColor as keyof Palette] as PaletteColor).main,
          0.2
        )}`
      : 'none';

    // color value
    let colorValue: string = white.main;

    if (ownerColor === 'white') {
      colorValue = text.primary;
    } else if (ownerColor === 'light') {
      colorValue = gradients.dark.state;
    }

    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,

      '&:hover': {
        boxShadow: hoveredBoxShadowValue,
      },

      '&:focus:not(:hover)': {
        boxShadow: boxShadowValue,
      },

      '&:disabled': {
        background: backgroundValue,
        color: colorValue,
      },
    };
  };

  // styles for the button with variant="text"
  const textStyles = () => {
    // color value
    const colorValue = palette[ownerColor as keyof Palette]
      ? (palette[ownerColor as keyof Palette] as PaletteColor).main
      : white.main;

    // color value when button is focused
    const focusedColorValue = palette[ownerColor as keyof Palette]
      ? (palette[ownerColor as keyof Palette] as TypeAction).focus
      : white.focus;

    return {
      color: colorValue,

      '&:hover': {
        color: focusedColorValue,
      },

      '&:focus:not(:hover)': {
        color: focusedColorValue,
      },
    };
  };

  // styles for the button with circular={true}
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });

  // styles for the button with iconOnly={true}
  const iconOnlyStyles = () => {
    // width, height, minWidth and minHeight values
    let sizeValue = pxToRem(38);

    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }

    // padding value
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      '& .material-icons': {
        marginTop: 0,
      },

      '&:hover, &:focus, &:active': {
        transform: 'none',
      },
    };
  };

  return {
    ...(ownerVariant === 'contained' && containedStyles()),
    ...(ownerVariant === 'outlined' && outliedStyles()),
    ...(ownerVariant === 'gradient' && gradientStyles()),
    ...(ownerVariant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});
