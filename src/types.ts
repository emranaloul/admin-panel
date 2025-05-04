import { Theme } from '@emotion/react';
import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import theme from 'assets/theme';
import { ReactElement, ReactNode } from 'react';

export type ComponentType<
  ComponentName extends keyof ComponentsProps & keyof ComponentsOverrides<Theme>,
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
    | 'none';
}

export type VariantType = 'text' | 'contained' | 'outlined' | 'gradient';
export type OwnerColorType =
  | 'white'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'light'
  | 'dark'
  | 'inherit'
  | undefined;
export interface MDButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: VariantType;
  color?: OwnerColorType;
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
  name?: string;
};

export type AppRoute = {
  type: string;
  name: string;
  icon: string | ReactNode;
  title?: string;
  key: number | string;
  href?: string;
  route: string;
  index?: boolean;
  component: ReactElement;
  auth: boolean;
  collapse?: Omit<AppRoute, 'collapse'>[];
};

export type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';

export type SizeType = 'small' | 'medium' | 'large';

export type ActionType = {
  route: string;
  label: string;
  type: 'external' | 'internal';
  color?: OwnerColorType;
};

export interface AuthPayload {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

export type LoginDataType = { email: string; password: string };

export enum AuthErrorMessages {
  EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted.',
  INVALID_PASSWORD = 'The password is invalid or the user does not have a password.',
  USER_DISABLED = 'The user account has been disabled by an administrator.',
}
export interface ErrorDetail {
  message: AuthErrorMessages | string;
  domain: string;
  reason: string;
}

export interface ErrorResponse {
  code: number;
  message: AuthErrorMessages | string;
  errors: ErrorDetail[];
}

export interface ApiResponse {
  error: ErrorResponse;
}

export interface ProviderUserInfo {
  providerId: string;
  federatedId: string;
  email: string;
  rawId: string;
}

export interface User {
  localId: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  passwordUpdatedAt: number;
  providerUserInfo: ProviderUserInfo[];
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
  lastRefreshAt: string;
}

export interface GetAccountInfoResponse {
  kind: string;
  users: User[];
}

export type PostEmployeePayload = {
  image: string;
  name: string;
  email: string;
  title: string;
  description: string;
  status: 'online' | 'offline';
  employed: Date;
};

export interface Employee extends PostEmployeePayload {
  id: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}
