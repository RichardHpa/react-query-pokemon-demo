import { Grid, TextField, Box, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createUser } from 'api/Users';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { ContentContainer } from 'components/ContentContainer';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup
    .string()
    .matches(/^\S*$/, 'Whitespace is not allowed')
    .required('Username is required'),
  email: yup.string().email().required('Email is required'),
});

export const AddUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: res => {
      queryClient.setQueryData(['user', res.id], () => res);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await mutateAsync(values);
    },
  });

  return (
    <div>
      <BreadcrumbHeader
        title="Add New User"
        crumbs={[
          {
            label: 'Users',
            path: '/users',
          },
          {
            label: 'Create',
          },
        ]}
      />

      <ContentContainer>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                autoComplete="off"
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoComplete="off"
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="off"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={isPending}>
                Add New User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ContentContainer>
    </div>
  );
};
