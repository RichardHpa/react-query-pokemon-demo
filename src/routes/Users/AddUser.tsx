import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from 'api/Users';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { ContentContainer } from 'components/ContentContainer';
import { UserForm } from 'forms/UserForm';

import type { User } from 'types/user';

export const AddUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: res => {
      queryClient.setQueryData(['users', res.id], () => res);
      queryClient.setQueryData(['users'], (old: User[]) => {
        if (!old) return;
        old.push(res);
        return old;
      });
      navigate(`/users/${res.id}`);
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
        <UserForm onSubmit={mutateAsync} loading={isPending} />
      </ContentContainer>
    </div>
  );
};
