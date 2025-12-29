'use client';

import { Grid, Stack, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";

import { FormInput, FormSlider, FormSelect } from "@/components/common";
import { Button, Form } from "@/components/ui";
import { 
  ProductFilterParams, 
  ProductFilterParamsValues,
  FilterKeys,
} from "./helpers";

const FilterForm = () => {
  const form = useForm<ProductFilterParams>({
    defaultValues: ProductFilterParamsValues,
  });

  const {
    control,
    handleSubmit,
  } = form;

  const stockRange = useWatch({
    control,
    name: FilterKeys._STOCK_LEVEL,
  });

  const handleValidSubmit = (formValues: ProductFilterParams) => {
    console.log(formValues);
  };

  return (
    <Stack>
      <Stack direction='row' gap={2}>
        <BiFilterAlt style={{ width: '28px', height: '28px' }} />
        <Typography style={{
          fontSize: '20px',
          fontWeight: 700
          }}>
          Filter Data
        </Typography>
      </Stack>

      <Typography mt={1} mb={3}>
        Narrow down the results quickly and find what you need.
      </Typography>
      
      <Stack style={{
        borderBottom: '1px solid #000',
        paddingBottom: '12px',
      }}>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleValidSubmit)} id="filter-form">
            <Grid container spacing={3}>
              <Grid size={4}>
                <FormInput 
                  name={FilterKeys._TITLE}
                  placeholder="Search for Product Title"
                  startIcon={<IoIosSearch style={{ width: '20px', height: '20px' }} />}
                />
              </Grid>
              <Grid size={4}>
                <FormInput 
                  name={FilterKeys._SKU}
                  placeholder="Search for SKUs"
                  startIcon={<IoIosSearch style={{ width: '20px', height: '20px' }} />}
                />
              </Grid>
              <Grid size={4}>
                <FormSlider 
                  name={FilterKeys._STOCK_LEVEL}
                  min={0}
                  max={200}
                  step={1}
                  value={stockRange}
                  showValue
                  label="Stock Level"
                />
              </Grid>
              <Grid size={4}>
                <FormSelect 
                  name={FilterKeys._CATEGORY}
                  options={[
                    { label: 'Category 1', value: '1' },
                    { label: 'Category 2', value: '2' },
                    { label: 'Category 3', value: '3' },
                    { label: 'Category 4', value: '4' },
                  ]}
                  placeholder="Select Category"
                />
              </Grid>
              <Grid size={4}>
                <FormSelect 
                  name={FilterKeys._WAREHOUSE}
                  options={[]}
                  placeholder="Select Warehouse"
                />
              </Grid>
            </Grid>
          </form>
        </Form>
      </Stack>

      <Stack 
        justifyContent='flex-end'
        direction='row'
        gap={2}
        style={{ marginTop: '12px' }}
      >
        <Button
          variant='noShadow'
          label="Reset"
          style={{ width: '140px', backgroundColor: '#fff' }}
          startIcon={<LiaTimesSolid style={{ width: '20px', height: '20px' }} />}
        />
        <Button
          type="submit"
          variant='noShadow'
          form="filter-form"
          label="Apply"
          style={{ width: '140px' }}
          startIcon={<BiFilterAlt style={{ width: '20px', height: '20px' }} />}
        />
      </Stack>
    </Stack>
  );
};

export default FilterForm;
