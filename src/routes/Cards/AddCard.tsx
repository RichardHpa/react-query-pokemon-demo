import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ContentContainer } from 'components/ContentContainer';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { CardForm } from 'forms/CardForm';

import { createCard } from 'api/Cards';

export const AddCard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCard,
    onSuccess: res => {
      queryClient.setQueryData(['card', res.id], () => res);
      navigate(`/cards/${res.id}`);
    },
  });

  return (
    <div>
      <BreadcrumbHeader
        title="Add New Card"
        crumbs={[
          {
            label: 'Cards',
            path: '/cards',
          },
          {
            label: 'Create',
          },
        ]}
      />

      <ContentContainer>
        <Grid container spacing={4}>
          <Grid item xs>
            <CardForm onSubmit={mutateAsync} loading={isPending} />
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};
