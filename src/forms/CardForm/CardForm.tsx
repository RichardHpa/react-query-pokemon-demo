import { Grid, TextField, Box, Button, InputAdornment } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import type { FC } from 'react';

const validationSchema = yup.object({
  name: yup.string().required('Card name is required'),
  value: yup.string().required('Card value is required'),
});

interface CardFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export const CardForm: FC<CardFormProps> = ({ initialValues, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      value: '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      onSubmit(values);
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="Card Name"
            autoComplete="off"
            disabled={loading}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            value={formik.values.name}
            helperText={formik.touched.name && (formik.errors.name as string)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="value"
            required
            fullWidth
            id="value"
            label="Value"
            autoComplete="off"
            disabled={loading}
            type="number"
            onChange={formik.handleChange}
            error={formik.touched.value && Boolean(formik.errors.value)}
            value={formik.values.value}
            helperText={formik.touched.value && (formik.errors.value as string)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={loading}>
            Upload card
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
