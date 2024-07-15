/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FabButtonAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify/Iconify';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useSnackbar } from 'src/components/snackbar';

import { useForm } from 'react-hook-form';
import axios from 'src/utils/axios';
import NewMenu from './NewMenu';
import List from './List';

const MenuBuilder = () => {
  const [isNewMenuAdding, setIsNewMenuAdding] = useState(false);
  const [menuList, setMenuList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    menuId: '',
    menuName: '',
    url: '',
    parent: 1,
    menuSequence: '',
    file: '',
    action: 'add',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = methods;

  const fetchMenuList = useCallback(async () => {
    try {
      const menus = await axios.get(`/v1/menu/list`);

      console.log({ Menu: menus.data });
      setMenuList(menus.data);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const addNewMenu = () => {
    reset();
    setValue('action', 'add');
    setIsNewMenuAdding(false);
  };

  const onSubmit = useCallback(async (data) => {
    try {
      console.log({ data });
      const formData = new FormData();
      if (data.action === 'edit') formData.append('menuId', data.menuId);
      formData.append('menuName', data.menuName);
      formData.append('url', data.url);
      formData.append('seqno', data.menuSequence);
      formData.append('parent', data.parent);
      console.log({ formData });
      const request = await axios.post(
        `/v1/menu/${data.action === 'add' ? 'add' : 'update'}`,
        formData
      );
      if (request.status === 200) {
        fetchMenuList();
        setIsNewMenuAdding(false);
        reset();
        enqueueSnackbar(request.data.Msg, { variant: 'success' });
      }
      console.log(request);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!isNewMenuAdding ? (
        <Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'end', m: 2 }}>
            <FabButtonAnimate color="primary" size="small" onClick={() => setIsNewMenuAdding(true)}>
              <Iconify icon="eva:plus-fill" width={24} />
            </FabButtonAnimate>
          </Grid>
          <Box sx={{ height: 390 }}>
            <List menuList={menuList} methods={methods} setIsNewMenuAdding={setIsNewMenuAdding} />
          </Box>
        </Grid>
      ) : (
        <Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'end', m: 2 }}>
            <Button color="primary" variant="contained" size="small" onClick={addNewMenu}>
              Back
            </Button>
          </Grid>
          <Grid
            md={12}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              m: 2,
              gap: 2,
              border: '1px solid green',
              borderRadius: '20px',
            }}
          >
            <NewMenu methods={methods} />
          </Grid>
        </Grid>
      )}
    </FormProvider>
  );
};

export default MenuBuilder;
