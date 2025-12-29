'use client';

import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { Table } from '@/components/common';
import { allColumns } from './allColumns';
import FilterForm from './FilterForm';
import { mock } from './helpers';

const ProductList = () => {
  const columns = useMemo(() => {
    return allColumns();
  }, []);
    
  return (
    <Stack>
      <Table
        title="Product Management" 
        data={mock}
        totalRecord={mock.length}
        columns={columns}
        filterForm={<FilterForm />}
      />
    </Stack>
  );
};

export default ProductList;
