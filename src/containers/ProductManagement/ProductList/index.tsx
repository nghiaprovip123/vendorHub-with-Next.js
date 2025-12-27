'use client';

import { Stack } from '@mui/material';

import { Table } from '@/components/common';
import { useMemo } from 'react';
import { allColumns } from './allColumns';
import { mock } from './helpers';

const ProductList = () => {
  const columns = useMemo(() => {
    return allColumns(null);
  }, []);
    
  return (
    <Stack>
      <Table
        title="Product Management" 
        data={[]}
        columns={columns}
      />
    </Stack>
  );
};

export default ProductList;
