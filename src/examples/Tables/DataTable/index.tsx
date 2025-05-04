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

import { useMemo, useEffect, useState, Children } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  TableInstance,
  TableState,
  UsePaginationInstanceProps,
  UseGlobalFiltersInstanceProps,
  UseSortByInstanceProps,
  UsePaginationState,
  UseGlobalFiltersState,
  UseTableInstanceProps,
  Column,
  HeaderGroup,
} from 'react-table';

// @mui material components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import Autocomplete from '@mui/material/Autocomplete';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDPagination from 'components/MDPagination';

// Material Dashboard 2 React example components
import DataTableHeadCell from 'examples/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'examples/Tables/DataTable/DataTableBodyCell';
import { ColorType, VariantType } from 'types';

type PaginationVariant = Exclude<VariantType, 'text'> | 'gradient';
type PaginationColor = ColorType;

type TableProps<D extends object = object> = {
  columns: Column[];
  rows: D[];
};
interface Pagination {
  variant: PaginationVariant;
  color: PaginationColor;
}

interface EntriesPerPage {
  defaultValue: number;
  entries: number[];
}

interface DataTableProps {
  entriesPerPage?: EntriesPerPage;
  canSearch?: boolean;
  showTotalEntries?: boolean;
  table: TableProps; // Assuming table is an object with array values
  pagination?: Pagination;
  isSorted?: boolean;
  noEndBorder?: boolean;
}

interface TableStateWithPlugins<T extends object>
  extends TableState<T>,
    UsePaginationState<T>,
    UseGlobalFiltersState<T> {}

type TableInstanceWithPlugins<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<object> &
  UseGlobalFiltersInstanceProps<T> &
  UseSortByInstanceProps<T> &
  TableStateWithPlugins<object> & {
    state: { pageIndex: number; pageSize: number; globalFilter: object };
  };

function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch,
  showTotalEntries,
  table,
  pagination = { variant: 'gradient', color: 'info' },
  isSorted = true,
  noEndBorder,
}: DataTableProps) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ['5', '10', '15', '20', '25'];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultValue, globalFilter: '' } as Partial<
        TableStateWithPlugins<(typeof data)[0]>
      >,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as TableInstanceWithPlugins<(typeof data)[0]> & UseTableInstanceProps<(typeof data)[0]>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  // useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: number): void => setPageSize(value);

  // Render the paginations
  const renderPagination = (pageOptions as number[]).map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  // const handleInputPagination = ({
  //   target: { valueAsNumber },
  // }: React.ChangeEvent<HTMLInputElement>) =>
  //   valueAsNumber > pageOptions.length || valueAsNumber < 0
  //     ? gotoPage(0)
  //     : gotoPage(Number(valueAsNumber));

  // Customized page options starting from 1
  const customizedPageOptions = (pageOptions as number[]).map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({
    target: { valueAsNumber },
  }: React.ChangeEvent<HTMLInputElement>) => gotoPage(Number(valueAsNumber - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value: unknown | object) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column: HeaderGroup): false | 'desc' | 'none' | 'asce' => {
    let sortedValue: false | 'desc' | 'none' | 'asce' | undefined;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce';
    } else if (isSorted) {
      sortedValue = 'none';
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage || canSearch ? (
        <MDBox display='flex' justifyContent='space-between' alignItems='center' p={3}>
          {entriesPerPage && (
            <MDBox display='flex' alignItems='center'>
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size='small'
                sx={{ width: '5rem' }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant='caption' color='secondary'>
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width='12rem' ml='auto'>
              <MDInput
                placeholder='Search...'
                value={search}
                size='small'
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component='thead'>
          {headerGroups.map((headerGroup) =>
            Children.toArray(
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.getHeaderGroupProps().key}
              >
                {headerGroup.headers.map((column) => (
                  <DataTableHeadCell
                    {...column.getHeaderProps(isSorted ? column.getSortByToggleProps() : undefined)}
                    width={column.width ? column.width : 'auto'}
                    align={column.align ? column.align : 'left'}
                    sorted={setSortedValue(column)}
                    key={column.getHeaderProps().key}
                  >
                    {column.render('Header')}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            )
          )}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key: number) => {
            prepareRow(row);
            return Children.toArray(
              <TableRow {...row.getRowProps()} key={row.getRowProps().key}>
                {row.cells.map((cell) =>
                  Children.toArray(
                    <DataTableBodyCell
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : 'left'}
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                    >
                      {cell.render('Cell')}
                    </DataTableBodyCell>
                  )
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant='button' color='secondary' fontWeight='regular'>
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination?.variant !== 'gradient' ? pagination?.variant : 'contained'}
            color={pagination?.color && pagination.color !== 'dark' ? pagination?.color : 'info'}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width='5rem' mx={1}>
                <MDInput
                  inputProps={{ type: 'number', min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={handleInputPaginationValue}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

export default DataTable;
