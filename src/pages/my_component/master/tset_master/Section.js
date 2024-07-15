/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
// import { RHFTextField } from '../../../../../src/components/hook-form';

const Section = ({ classIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    name: `studentDetails.${classIndex}.sectionList`,
    control,
  });
  console.log(classIndex, 'classIndex');
  return (
    <div>
      {fields.map((sectionField, secIndex) => (
        <div key={sectionField.id}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <RHFTextField
                fullWidth
                name={`studentDetails.${classIndex}.sectionList.${secIndex}.sectionName`}
                label="sectionName"
              />
            </Grid>
            {secIndex !== 0 ? (
              <Grid item md={4}>
                <Button variant="contained" size="small" onClick={() => remove(secIndex)}>
                  Remove Item
                </Button>
              </Grid>
            ) : (
              <Grid item md={4}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => append({ sectionName: '' })}
                >
                  Add Section
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default Section;
