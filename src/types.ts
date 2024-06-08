import { Theme } from '@emotion/react';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import theme from 'assets/theme';
import { ReactElement, ReactNode } from 'react';

export type ComponentType<
  ComponentName extends keyof ComponentsProps & keyof ComponentsOverrides<Theme>
> = {
  defaultProps?: ComponentsProps[ComponentName];
  styleOverrides?: ComponentsOverrides<Theme>[ComponentName];
};

export type ThemeType = typeof theme;

export interface BoxOwnerState {
  variant?: 'contained' | 'gradient';
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'none'
    | 'inherit';
}

export type VariantType = 'text' | 'contained' | 'outlined' | 'gradient';
export interface MDButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: VariantType;
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'inherit';
  circular?: boolean;
  iconOnly?: boolean;
}

export type AvatarOwnerState = {
  bgColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'inset';
};

export type AppRoute = {
  type: string;
  name: string;
  icon: string | ReactNode;
  title?: string;
  key: number | string;
  href?: string;
  route: string;
  component: ReactElement;
};
