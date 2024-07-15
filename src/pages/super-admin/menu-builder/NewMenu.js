/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid, Button } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { Upload } from 'src/components/upload';

const NewMenu = ({ methods }) => {
  const { reset, watch, control, setValue } = methods;

  return (
    <Grid md={12} sx={{ display: 'flex', flexDirection: 'column', m: 2, gap: 2 }}>
      <Grid md={12} sx={{ m: 1, gap: 2 }}>
        <RHFTextField name="menuName" label="Menu Name" required />
      </Grid>
      <Grid md={12} sx={{ m: 1, gap: 2 }}>
        <RHFTextField name="url" label="Menu URL" required />
      </Grid>
      <Grid md={12} sx={{ m: 1, gap: 2 }}>
        <RHFTextField name="menuSequence" label="Menu Sequence" required />
      </Grid>
      <Grid md={12} sx={{ m: 1, gap: 2 }}>
        <Upload name="file" />
      </Grid>
      <Grid md={12} sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, gap: 2 }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewMenu;
