import { useCallback } from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';

import { useMutation } from '@tanstack/react-query';

interface UserTest {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
}

export const createBook = async ({ ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('something went wrong');
  }

  return response.json();
};

export const AddUser = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createBook,
    onSuccess: res => {
      console.log('success', res);
    },
  });

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      const data = new FormData(event.target);

      const firstName = data.get('firstName')!;
      const lastName = data.get('lastName')!;

      await mutateAsync({ firstName, lastName });
    },
    [mutateAsync]
  );

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" disabled={isPending}>
            Add New User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
