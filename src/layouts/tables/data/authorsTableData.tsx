/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import MDBadge from 'components/MDBadge';

// Images
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import MDButton from 'components/MDButton';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';

export default function data(
  data: {
    image: string;
    name: string;
    email: string;
    title: string;
    description: string;
    status: 'online' | 'offline' | string;
    employed: Date;
  }[]
) {
  const Author = ({ image, name, email }: { image: string; name: string; email: string }) => (
    <MDBox display='flex' alignItems='center' lineHeight={1}>
      <MDAvatar src={image} name={name} size='sm' />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display='block' variant='button' fontWeight='medium'>
          {name}
        </MDTypography>
        <MDTypography variant='caption'>{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }: { title: string; description: string }) => (
    <MDBox lineHeight={1} textAlign='left'>
      <MDTypography display='block' variant='caption' color='text' fontWeight='medium'>
        {title}
      </MDTypography>
      <MDTypography variant='caption'>{description}</MDTypography>
    </MDBox>
  );

  const EditDialog = ({
    image,
    name,
    email,
    title,
    description,
    status,
    employed,
  }: {
    image: string;
    name: string;
    email: string;
    title: string;
    description: string;
    status: 'online' | 'offline' | string;
    employed: Date;
  }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <MDButton variant='contained' color='secondary' onClick={() => setOpen(true)}>
          Edit
        </MDButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit</DialogTitle>
          <Divider
            sx={(theme) => ({
              color: theme.palette.dark.main,
              margin: 0,
            })}
          />
          <DialogContent className=' flex justify-center items-center gap-4'>
            <MDAvatar src={image} className=' m-auto' />
            <DialogContentText>{`hello ${name} and your email ${email}`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={() => setOpen(false)}>Close</MDButton>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return {
    columns: [
      { Header: 'author', accessor: 'author', width: '45%', align: 'left' },
      { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'employed', accessor: 'employed', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: data
      .map(() => ({
        image: faker.image.avatar(),
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        title: faker.person.jobTitle(),
        description: faker.person.jobDescriptor(),
        status: faker.helpers.arrayElement(['online', 'offline']),
        employed: faker.date.past(),
      }))
      .map((employee) => ({
        author: <Author image={employee.image} name={employee.name} email={employee.email} />,
        function: <Job title={employee.title} description={employee.description} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={employee.status}
              color={employee.status === 'online' ? 'success' : 'dark'}
              variant='gradient'
              size='sm'
            />
          </MDBox>
        ),
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            {new Date(employee.employed).toLocaleDateString()}
          </MDTypography>
        ),
        action: <EditDialog {...employee} />,
      })),
  };
}
