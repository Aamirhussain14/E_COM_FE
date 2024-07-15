/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
// @mui
import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _userList } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Add from './Add';

// ----------------------------------------------------------------------

export default function InstituteEdit() {
  const { themeStretch } = useSettingsContext();
  const [listData, setListData] = useState({});

  const { id } = useParams();
  console.log(id, 'idididi');
  // const currentUser = listData.find((user) => paramCase(user.id) === id);
  // console.log(currentUser, 'currentUserEdit');

  const NewUserSchema = Yup.object().shape({
    instituteName: Yup.string().required('Name is required'),
    instituteMail: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    institutePhone: Yup.string().required('Phone number is required'),
    instituteType: Yup.string().required('Institute Type is required'),
    instituteAddress: Yup.string().required('Institute Address is required'),
    institutePinCode: Yup.string().required('PinCode is required'),
  });

  const defaultValuesEdit = {
    instituteName: listData?.instituteName,
    instituteMail: listData?.instituteMail,
    institutePhone: listData?.institutePhone,
    instituteType: listData?.instituteType,
    instituteAddress: listData?.instituteAddress,
    institutePinCode: listData?.institutePinCode,
    instituteLogo: listData?.instituteLogo,
  };

  const dataInstituteHandler = useCallback(async () => {
    try {
      const response = await axios.get(`/v1/institutes/get?instituteId=${id}`);
      setListData(response.data.data);
    } catch (error) {
      console.error({ error });
    }
  }, []);

  useEffect(() => {
    dataInstituteHandler();
  }, []);
  console.log('listData',listData);
  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            // { name: currentUser?.name },
          ]}
        />
      {
        !_.isEmpty(listData) && <Add
          isEdit
          NewUserSchema={NewUserSchema} defaultValues={defaultValuesEdit}
          id={id}
        />
      }
        
      </Container>
    </>
  );
}
