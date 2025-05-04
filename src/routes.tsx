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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts

// @mui icons
import Icon from '@mui/material/Icon';
import AuthenticatedLayout from 'layouts/authenticated/AuthenticatedLayout';
import AuthenticationLayout from 'layouts/authentication/AuthenticationLayout';
// import AuthorsTable from 'layouts/tables/AuthorsTable';
import AuthorsTable from 'layouts/tables/AuthorsTable';
import ProjectsTable from 'layouts/tables/ProjectsTable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from 'types';

const Dashboard = lazy(() => import('layouts/dashboard'));
// const Tables = lazy(() => import('layouts/tables'));
const Billing = lazy(() => import('layouts/billing'));
const RTL = lazy(() => import('layouts/rtl'));
const Notifications = lazy(() => import('layouts/notifications'));
const Profile = lazy(() => import('layouts/profile'));
const SignIn = lazy(() => import('layouts/authentication/sign-in'));
const SignUp = lazy(() => import('layouts/authentication/sign-up'));

const routes: AppRoute[] = [
  {
    type: 'collapse',
    name: 'Main',
    key: 'main',
    icon: <Icon fontSize='small'>dashboard</Icon>,
    route: '/',
    component: <AuthenticatedLayout />,
    auth: true,
    title: 'main',
    collapse: [
      {
        type: 'collapse',
        name: 'Index',
        key: 'index',
        icon: <Icon fontSize='small'>index</Icon>,
        route: 'index',
        component: <Navigate to={'dashboard'} />,
        index: true,
        auth: true,
        title: 'index',
      },
      {
        type: 'collapse',
        name: 'Dashboard',
        key: 'dashboard',
        icon: <Icon fontSize='small'>dashboard</Icon>,
        route: 'dashboard',
        component: <Dashboard />,
        auth: true,
        title: 'dashboard',
      },
      {
        type: 'collapse',
        name: 'Users',
        key: 'users',
        icon: <Icon fontSize='small'>table_view</Icon>,
        route: 'users',
        component: <AuthorsTable />,
        auth: true,
        // collapse: [
        //   {
        //     type: 'collapse',
        //     name: 'Authors Table',
        //     key: 'authorTables',
        //     icon: <Icon fontSize='small'>auto_stories</Icon>,
        //     route: 'authors',
        //     component: <AuthorsTable />,
        //     auth: true,
        //   },
        //   {
        //     type: 'collapse',
        //     name: 'Projects Table',
        //     key: 'projectsTables',
        //     icon: <Icon fontSize='small'>view_list</Icon>,
        //     route: 'projects',
        //     component: <ProjectsTable />,
        //     auth: true,
        //   },
        // ],
      },
      {
        type: 'collapse',
        name: 'Billing',
        key: 'billing',
        icon: <Icon fontSize='small'>receipt_long</Icon>,
        route: 'billing',
        component: <Billing />,
        auth: true,
      },
      {
        type: 'collapse',
        name: 'RTL',
        key: 'rtl',
        icon: <Icon fontSize='small'>format_textdirection_r_to_l</Icon>,
        route: 'rtl',
        component: <RTL />,
        auth: true,
      },
      {
        type: 'collapse',
        name: 'Notifications',
        key: 'notifications',
        icon: <Icon fontSize='small'>notifications</Icon>,
        route: 'notifications',
        component: <Notifications />,
        auth: true,
      },
      {
        type: 'collapse',
        name: 'Profile',
        key: 'profile',
        icon: <Icon fontSize='small'>person</Icon>,
        route: 'profile',
        component: <Profile />,
        auth: true,
      },
    ],
  },
  // {
  //   type: 'collapse',
  //   name: 'Dashboard',
  //   key: 'dashboard',
  //   icon: <Icon fontSize='small'>dashboard</Icon>,
  //   route: '/dashboard',
  //   component: <Dashboard />,
  //   auth: true,
  //   title: 'dashboard',
  // },

  {
    type: 'collapse',
    name: 'Authentication',
    key: 'authentication',
    icon: <Icon fontSize='small'>login</Icon>,
    route: 'authentication',
    component: <AuthenticationLayout />,
    collapse: [
      {
        type: 'collapse',
        name: 'Index',
        key: 'index',
        icon: <Icon fontSize='small'>login</Icon>,
        route: 'index',
        index: true,
        component: <Navigate to={'sign-in'} />,
        auth: false,
      },
      {
        type: 'collapse',
        name: 'Sign In',
        key: 'sign-in',
        icon: <Icon fontSize='small'>login</Icon>,
        route: 'sign-in',
        component: <SignIn />,
        auth: false,
      },
      {
        type: 'collapse',
        name: 'Sign Up',
        key: 'sign-up',
        icon: <Icon fontSize='small'>assignment</Icon>,
        route: 'sign-up',
        component: <SignUp />,
        auth: false,
      },
    ],
    auth: false,
  },
  // {
  //   type: 'collapse',
  //   name: 'unauthorized redirect',
  //   key: 'unauthorized-redirect',
  //   icon: <Icon fontSize='small'>assignment</Icon>,
  //   route: '/authentication/sign-up',
  //   component: <SignUp />,
  //   auth: false,
  // },
];

export default routes;
