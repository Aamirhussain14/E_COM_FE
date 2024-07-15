/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Typography } from '@mui/material';
import { Box, getValue } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Section from './Section';

// type FormValues = {
//     studentDetails: {
//         name: String,
//         age: number
//     }
//   }

const FieldArrayExample = () => {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked, 'isChecked');
  const defaultValues = {
    studentDetails: [{ className: '', sortName: '', sectionList: [{ sectionName: '' }] }],
  };

  const methods = useForm({
    // resolver: yupResolver(),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'studentDetails',
    control,
  });

  const onSubmit = async (data) => {
    console.log(data, 'data');
  };

  const handleAppend = () => {
    append({ className: '', sortName: '', sectionList: [{ sectionName: '' }] });
  };

  const handleAppendSectionList = () => {
    append({ sectionName: '' });
  };

  watch();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        {/* <Grid container> */}
        {/* {console.log(fields[0].secondStudent, '>>>>>>>>>>>field')} */}
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'row' }}>
            {console.log(field, index, 'index')}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  ref={register()}
                  name={`studentDetails.${index}.className`}
                  label="className"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFTextField
                ref={register()}
                name={`studentDetails.${index}.sortName`}
                label="sortName"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Section classIndex={index} {...{ control, register }} />
            </Grid>
            {index !== 0 ? (
              <Grid item md={4}>
                <Button variant="contained" size="small" onClick={() => remove(index)}>
                  Remove Item
                </Button>
              </Grid>
            ) : (
              <Grid item md={4}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => append({ className: '', sortName: '', sectionList: [{sectionName: ''}] })}
                >
                  Add Class
                </Button>
              </Grid>
            )}
          </div>
          
        ))}

        <Grid item md={4} sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            // loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Card>
    </FormProvider>
  );
};

export default FieldArrayExample;
