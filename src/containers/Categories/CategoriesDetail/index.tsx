'use client';

import { Grid, Typography } from '@mui/material';

import { Category } from '../CategoriesList/types';
import ImageCard from '@/components/ui/image-card';
import { ViewItem } from '@/components/customUI';

type Props = {
  data: Category,
};

const CategoriesDetail = ({ data }: Props) => {
  return (
    <Grid container spacing={2}>
      <ViewItem label='Category ID' value={data?.cid} />
      <ViewItem label='Title' value={data?.title} />

      <Grid size={12}>
        <Typography fontSize='18px' fontWeight={600} mb={1}>Image</Typography>
        <ImageCard 
          imageUrl={data?.image}
        />
      </Grid>
    </Grid>
  );
};

export default CategoriesDetail;
