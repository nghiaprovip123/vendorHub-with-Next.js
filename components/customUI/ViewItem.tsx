import { Grid, Typography } from '@mui/material';

type Props = {
  label: string,
  value: string,
  xs?: number,
};

const ViewItem = ({ label, value, xs = 6 }: Props) => {
  return (
    <Grid size={xs}>
      <Typography 
        fontSize='18px' 
        fontWeight={600}
        mb={1}
      >
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Grid>
  );
};

export default ViewItem;
