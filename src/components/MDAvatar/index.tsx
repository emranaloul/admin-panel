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

import { forwardRef } from 'react';

// Custom styles for MDAvatar
import MDAvatarRoot from 'components/MDAvatar/MDAvatarRoot';
import { AvatarProps } from '@mui/material';
import { AvatarOwnerState } from 'types';

interface AvatarCustomProps extends AvatarProps, AvatarOwnerState {}

const MDAvatar = forwardRef<HTMLImageElement, AvatarProps & AvatarCustomProps>(
  ({ bgColor = 'transparent', size = 'md', shadow = 'none', name, ...rest }, ref) => (
    <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size, name }} {...rest} />
  )
);

export default MDAvatar;
