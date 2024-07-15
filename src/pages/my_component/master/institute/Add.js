import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import axios from '../../../../utils/axios';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

Add.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  defaultValues: PropTypes.object,
  defaultValuesEdit: PropTypes.object,
  NewUserSchema: PropTypes.object,
 id: PropTypes.string
};

export default function Add({
  isEdit = false,
  currentUser,
  defaultValues,
  NewUserSchema,
  defaultValuesEdit,
  id,
}) {
  console.log(currentUser, 'currentUser');
  console.log(id, 'id');
  console.log(defaultValuesEdit, 'defaultValuesEdit');
  console.log(defaultValues, 'defaultValues');
  console.log(NewUserSchema, 'NewUserSchema');
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState(defaultValues);
  const { enqueueSnackbar } = useSnackbar();

  const instituteTypeList = [
    'COLLEGE',
    'GROUP_OF_COLLEGES',
    'UNIVERSITY',
    'SCHOOL',
    'GROUP_OF_SCHOOL',
  ];

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    initialValue,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(initialValue);
    setInitialValue(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, initialValue]);

  const onSubmit = async (data) => {
    try {
      const response = await !isEdit ? axios.post('/v1/institutes/add', { ...data }) : axios.put(`/v1/institutes/update?instituteId=${id}`, { ...data });
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Institute Add successfully' : "Institute Update successfully");
      navigate(PATH_DASHBOARD.master.instituteList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFSelect
                defaultValue={defaultValues.instituteType}
                name="instituteType"
                size="small"
                label="Institute Type"
              >
                {instituteTypeList.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="instituteName" size="small" label="Institute Name" />
              <RHFTextField name="instituteMail" size="small" label="Institute Mail" />
              <RHFTextField name="institutePhone" size="small" label="Institute Phone" />
              <RHFTextField name="institutePinCode" size="small" label="Institute PinCode" />
              <RHFTextField name="instituteLogo" size="small" label="Institute Logo" />
              <RHFTextField
                name="instituteAddress"
                size="small"
                multiline
                rows={2}
                label="Institute Address"
              />
            </Box>
            {isEdit === false && (
              <Card sx={{ p: 1, mt: 3 }}>
                <Typography>Account Details</Typography>
                <Box
                  rowGap={3}
                  sx={{ mt: 3, mb: 3 }}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(3, 1fr)',
                  }}
                >
                  <RHFTextField size="small" name="name" label="Username" />
                  <RHFTextField name="phone" size="small" label="Phone" />
                  <RHFTextField name="email" size="small" label="Email" />
                  <RHFTextField name="password" size="small" label="Password" />
                </Box>
              </Card>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Submit' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
