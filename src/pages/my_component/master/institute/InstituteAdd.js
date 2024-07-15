import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
import * as Yup from 'yup';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Add from './Add';

// ----------------------------------------------------------------------

export default function InstituteAdd() {
  const { themeStretch } = useSettingsContext();
  const NewUserSchema = Yup.object().shape({
    instituteName: Yup.string().required('Name is required'),
    instituteMail: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    institutePhone: Yup.string().required('Phone number is required'),
    instituteType: Yup.string().required('Institute Type is required'),
    instituteAddress: Yup.string().required('Institute Address is required'),
    institutePinCode: Yup.string().required('PinCode is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    instituteName: '',
    instituteMail:  '',
    institutePhone: '',
    instituteType: '',
    instituteAddress: '',
    institutePinCode: '',
    instituteLogo: '',
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  return (
    <>
      <Helmet>
        <title> User: Create a new user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Institute"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            // {
            //   name: 'User',
            //   href: PATH_DASHBOARD.user.list,
            // },
            { name: 'Institute' },
          ]}
        />
        <Add NewUserSchema={NewUserSchema} defaultValues={defaultValues}/>
      </Container>
    </>
  );
}
