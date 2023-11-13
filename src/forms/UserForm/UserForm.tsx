import { Grid, TextField, Box, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

import type { FC } from 'react';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup
    .string()
    .matches(/^\S*$/, 'Whitespace is not allowed')
    .required('Username is required'),
  email: yup.string().email().required('Email is required'),
});

interface UserFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export const UserForm: FC<UserFormProps> = ({ initialValues, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmit(values);
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoComplete="off"
            disabled={loading}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            value={formik.values.firstName}
            helperText={formik.touched.firstName && (formik.errors.firstName as string)}
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
            disabled={loading}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            value={formik.values.lastName}
            helperText={formik.touched.lastName && (formik.errors.lastName as string)}
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
            disabled={loading}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            value={formik.values.username}
            helperText={formik.touched.username && (formik.errors.username as string)}
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
            disabled={loading}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            value={formik.values.email}
            helperText={formik.touched.email && (formik.errors.email as string)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={loading}>
            {initialValues ? 'Update User' : 'Add New User'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
