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
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import MDButton from 'components/MDButton';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { Children, FormEvent, useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import MDInput from 'components/MDInput';
import { Employee, PostEmployeePayload, User } from 'types';
import { addEmployee, editEmployee } from 'store/employees';
import { ActionsEnum } from 'enums';
``;
type ActionType =
  | {
      key: keyof User;
      payload: string | Date;
    }
  | { key: 'status'; payload: 'online' | 'offline' }
  // | { key: 'employed'; payload: Date }
  | { key: 'reset'; payload: User };

const reducer = (state: User, action: ActionType) => {
  const { key, payload } = action;
  if (key === 'reset') return payload;
  return {
    ...state,
    [key]: payload,
  };
};

function AuthorsTable() {
  const [open, setOpen] = useState(false);
  const [actionMode, setActionMode] = useState<ActionsEnum>(ActionsEnum.ADD);
  const { data } = useAppSelector((state) => state.users);
  const editCallback = (user: User) => {
    setOpen(true);
    dispatch({ key: 'reset', payload: user });
    setActionMode(ActionsEnum.EDIT);
  };
  const { columns, rows } = authorsTableData({ data, editCallback });
  const initialState: User = {
    avatar: '',
    name: '',
    email: '',
    status: 'active',
    createdAt: new Date().toDateString(),
    id: '',
    lastLogin: '',
    phone: null,
    role: '',
    gender: '',
    dateOfBirth: '',
    updatedAt: '',
  };
  const [employee, dispatch] = useReducer(reducer, initialState);
  const appDispatch = useAppDispatch();
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      if (actionMode === ActionsEnum.ADD) {
        appDispatch(addEmployee(employee));
      } else {
        appDispatch(editEmployee(employee as User));
      }
      setOpen(false);
      dispatch({ key: 'reset', payload: initialState });
    } catch (error) {
      throw error;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox className=' flex justify-end px-10 pt-5'>
                <Tooltip title='add employee'>
                  <MDButton
                    iconOnly
                    color='secondary'
                    onClick={() => {
                      setOpen(true);
                      setActionMode(ActionsEnum.ADD);
                    }}
                  >
                    <AddCircle fontSize='large' />
                  </MDButton>
                </Tooltip>
              </MDBox>
              <MDBox pt={1}>
                <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog open={open}>
        <form onSubmit={submitHandler}>
          <DialogTitle>
            {actionMode === ActionsEnum.ADD ? 'Add Employee' : 'Edit Employee'}
          </DialogTitle>
          <DialogContent>
            <Grid container gap={3} justifyContent={'center'} alignItems={'stretch'}>
              <Grid item xs={4} justifyContent={'center'}>
                <MDInput
                  placeholder='name'
                  name='name'
                  value={employee.name}
                  onChange={(e) => dispatch({ key: 'name', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  type='email'
                  placeholder='email'
                  name='email'
                  value={employee.email}
                  onChange={(e) => dispatch({ key: 'email', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  placeholder='title'
                  name='title'
                  value={employee.title}
                  onChange={(e) => dispatch({ key: 'title', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  placeholder='description'
                  rows={3}
                  name='description'
                  value={employee.description}
                  onChange={(e) => dispatch({ key: 'description', payload: e.target.value })}
                />
              </Grid>
              <Grid item xs={4} display={'flex'} className=' h-10'>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>avatar</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    name='image'
                    className=' h-full'
                    value={employee.image}
                    label='active'
                    onChange={(e) => dispatch({ key: 'image', payload: e.target.value })}
                    renderValue={(value) => (
                      <MDBox className=' flex justify-center'>
                        <Avatar className='m-auto' src={value} />
                      </MDBox>
                    )}
                  >
                    {Children.toArray(
                      _.times(10).map(() => {
                        const avatar = faker.image.avatar();
                        return (
                          <MenuItem value={avatar} className=' flex justify-center items-center'>
                            <Avatar src={avatar} className=' m-auto' />
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} display={'flex'}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    name='status'
                    className=' h-full'
                    value={employee.status}
                    label='active'
                    onChange={(e) =>
                      dispatch({ key: 'status', payload: e.target.value as 'offline' | 'online' })
                    }
                  >
                    <MenuItem value={'online'}>online</MenuItem>
                    <MenuItem value={'offline'}>offline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={() => setOpen(false)} className=' w-28' color='secondary'>
              cancel
            </MDButton>
            <MDButton type='submit' className=' w-28' color='primary'>
              save
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
    </DashboardLayout>
  );
}

export default AuthorsTable;
