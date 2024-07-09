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
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from 'examples/Sidenav/styles/sidenavCollapse';

// Material Dashboard 2 React context
import { ControllerType, useMaterialUIController } from 'context';
import { ThemeType } from 'types';
import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type PropTypes = {
  name: string;
  icon: string | ReactNode;
  active: boolean;
  collapse?: 'item' | 'container';
  collapsed?: boolean;
  expandable?: boolean;
};

function SidenavCollapse({
  icon,
  name,
  active,
  collapse = 'container',
  collapsed,
  expandable,
  ...rest
}: PropTypes) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } =
    controller as ControllerType;

  return (
    <ListItem component='li'>
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme as ThemeType, {
            active,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor,
            collapseItem: collapse === 'item',
            expanded: !collapsed,
          })
        }
        className={collapse === 'item' ? ' ltr:pl-10 rtl:pr:10' : ''}
      >
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
          }
        >
          {typeof icon === 'string' ? (
            <Icon
              sx={(theme: Theme) => collapseIcon(theme, { active })}
              fontSize={collapse === 'item' ? 'small' : 'medium'}
            >
              {icon}
            </Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              active,
            })
          }
        />
        {expandable && <>{!collapsed ? <ExpandLess /> : <ExpandMore />}</>}
      </MDBox>
    </ListItem>
  );
}

export default SidenavCollapse;
