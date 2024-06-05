import { Theme } from '@emotion/react';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import theme from 'assets/theme';

export type ComponentType<ComponentName extends keyof ComponentsProps & keyof ComponentsOverrides<Theme>> =
  {
    defaultProps?: ComponentsProps[ComponentName];
    styleOverrides?: ComponentsOverrides<Theme>[ComponentName];
  };

  export type ThemeType = typeof theme
