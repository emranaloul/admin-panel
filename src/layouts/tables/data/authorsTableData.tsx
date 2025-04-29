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
import MDButton from 'components/MDButton';
import _ from 'lodash';
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import { User } from 'types';
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch } from 'store/hooks';
import { deleteEmployee } from 'store/employees';

export default function data({
  data,
  editCallback,
}: {
  data: User[];
  editCallback?: (user: User) => void;
}) {
  const Author = ({ image, name, email }: { image?: string; name: string; email: string }) => (
    <MDBox display='flex' alignItems='center' lineHeight={1}>
      {image && <MDAvatar src={image} name={name} size='sm' />}
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

  const DeleteDialog = ({ id }: User) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    return (
      <>
        <MDButton iconOnly variant='contained' color='error' onClick={() => setOpen(true)}>
          <Delete />
        </MDButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Delete</DialogTitle>
          <Divider
            sx={(theme) => ({
              color: theme.palette.dark.main,
              margin: 0,
            })}
          />
          <DialogContent className=' flex justify-center items-center gap-4'>
            <DialogContentText>Are you sure you want to delete this employee?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton color='secondary' onClick={() => setOpen(false)}>
              Close
            </MDButton>
            <MDButton color='error' onClick={() => dispatch(deleteEmployee(id))}>
              Delete
            </MDButton>
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

    rows: data.map((user) => ({
      author: <Author image={user.avatar} name={user.name} email={user.email} />,
      // function: <Job title={user.title} description={user.description} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={user.status}
            color={user.status === 'online' ? 'success' : 'dark'}
            variant='gradient'
            size='sm'
          />
        </MDBox>
      ),
      employed: (
        <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
          {new Date(user.createdAt).toLocaleDateString()}
        </MDTypography>
      ),
      action: (
        <MDBox className=' flex gap-2'>
          <MDButton
            iconOnly
            variant='contained'
            color='secondary'
            onClick={() => editCallback?.(user)}
          >
            <Edit />
          </MDButton>
          <DeleteDialog {...user} />
        </MDBox>
      ),
    })),
  };
}
