import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ContentContainer } from 'components/ContentContainer';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { PokemonApiSearch } from 'components/PokemonApiSearch';
import { CardForm } from 'forms/CardForm';

import { createCard } from 'api/Cards';

import type { Card, CardApi } from 'types/card';
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const getHighestValue = (tcgPlayer?: PokemonTCG.TCGPlayer) => {
  if (!tcgPlayer) return NaN;
  let arr = Object.keys(tcgPlayer.prices).map(key => {
    // @ts-expect-error
    return tcgPlayer.prices[key].high;
  });

  return Math.max(...arr);
};

export const AddCard = () => {
  const navigate = useNavigate();
  const [defaultInfo, setDefaultInfo] = useState<Card>();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCard,
    onSuccess: res => {
      queryClient.setQueryData(['card', res.id], () => res);
      queryClient.setQueryData(['cards'], (old: Card[]) => {
        if (!old) return;
        old.push(res);
        return old;
      });

      navigate(`/cards/${res.id}`);
    },
  });

  const handleOnSelect = useCallback((card: CardApi | null) => {
    if (!card) return;
    setDefaultInfo({
      apiId: card.id,
      name: card.name,
      image: card.images.large,
      value: getHighestValue(card.tcgplayer),
    });
  }, []);

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

      <Stack spacing={4}>
        <ContentContainer>
          <PokemonApiSearch onSelect={handleOnSelect} />
        </ContentContainer>

        {defaultInfo && (
          <ContentContainer>
            <Grid container spacing={4}>
              <Grid item xs>
                <CardForm onSubmit={mutateAsync} loading={isPending} initialValues={defaultInfo} />
              </Grid>
            </Grid>
          </ContentContainer>
        )}
      </Stack>
    </div>
  );
};
