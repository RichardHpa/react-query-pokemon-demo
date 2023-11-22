import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Skeleton } from '@mui/material';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { getUser, updateUser, deleteUser } from 'api/Users';
import { invariant } from 'helpers/invariant';
import { UserForm } from 'forms/UserForm';

import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { ContentContainer } from 'components/ContentContainer';

export const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  invariant(userId);
  const QUERY_KEY = ['users', userId];
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: values => updateUser(userId, values),
    onSuccess: res => {
      queryClient.setQueryData(QUERY_KEY, () => res);
      queryClient.setQueryData(['users'], (old: any[]) => {
        if (!old) return;
        const target = old.find(obj => obj.id === res.id);
        Object.assign(target, res);
        return old;
      });
      enqueueSnackbar('User has been updated', { variant: 'success' });
    },
  });

  const { mutateAsync: deleteAsync, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.setQueryData(['users'], (old: any[]) => {
        if (!old) return;

        const indexOfObject = old.findIndex(object => {
          return object.id === userId;
        });

        old.splice(indexOfObject, 1);
        return old;
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      enqueueSnackbar('User has been removed', { variant: 'success' });
      navigate('/users');
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
  });

  const processing = isPending || isDeleting;

  return (
    <div>
      <BreadcrumbHeader
        title={`Edit ${data?.firstName} ${data?.lastName}`}
        loading={isLoading}
        actions={
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteAsync()}
            disabled={processing}
          >
            Delete Account
          </Button>
        }
        crumbs={[
          {
            label: 'Users',
            path: '/users',
          },
          {
            label: 'User info',
            path: `/users/${userId}`,
          },
          {
            label: 'Edit',
          },
        ]}
      />

      {isLoading ? (
        <Box>
          <Skeleton height={250} />
        </Box>
      ) : (
        <ContentContainer>
          <UserForm onSubmit={mutateAsync} initialValues={data} loading={processing} />
        </ContentContainer>
      )}
    </div>
  );
};
