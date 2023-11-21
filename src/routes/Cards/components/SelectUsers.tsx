import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Card, CardHeader, CardContent } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { getUsers } from 'api/Users';
import { addCardToUser, getUsersWhoOwnCard, removeCardFromUser } from 'api/UsersCards';

import type { FC } from 'react';
import type { User } from 'types/user';
import type { Card as CardProps } from 'types/card';

interface SelectUsersProps {
  card: CardProps;
}

export const SelectUsers: FC<SelectUsersProps> = ({ card }) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState<User[]>([]);
  const { data, isLoading: loadingAllUsers } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { data: matchedUsers } = useQuery({
    queryKey: ['cards', card.id, 'users'],
    queryFn: () => getUsersWhoOwnCard(card.id!),
  });

  useEffect(() => {
    if (matchedUsers) {
      setUsers(matchedUsers);
    }
  }, [matchedUsers]);

  const { mutateAsync: addCardToUserAsync, isPending: isAdding } = useMutation({
    mutationFn: (id: string) => addCardToUser({ userId: id, cardId: card.id! }),
    onSuccess: res => {
      queryClient.setQueryData(['users'], (old: User[]) => {
        if (!old) return;
        const target = old.find(obj => obj.id === res.user.id);

        if (target) {
          target.totalValue += card.value;
        }
        return old;
      });

      queryClient.setQueryData(['cards', card.id, 'users'], (old: User[]) => {
        if (!old) return;
        old.push(res.user);
        return old;
      });

      queryClient.setQueryData(['users', res.user.id, 'cards'], (currentCards: CardProps[]) => {
        if (!currentCards) return;
        currentCards.push(data);
        return currentCards;
      });

      enqueueSnackbar(`${res.user.firstName} has been added`, { variant: 'success' });
    },
  });

  const { mutateAsync: removeUser, isPending: isRemoving } = useMutation({
    mutationFn: (userId: string) => removeCardFromUser({ userId, cardId: card.id! }),
    onSuccess: res => {
      queryClient.setQueryData(['users'], (currentUsers: User[]) => {
        if (!currentUsers) return;
        const target = currentUsers.find(obj => obj.id === res.user.id);
        if (target) {
          target.totalValue -= card.value;
        }
        return currentUsers;
      });

      queryClient.setQueryData(['cards', card.id, 'users'], (currentOwners: User[]) => {
        if (!currentOwners) return;
        const indexOfObject = currentOwners.findIndex(object => {
          return object.id === res.user.id;
        });

        currentOwners.splice(indexOfObject, 1);
        return currentOwners;
      });

      queryClient.setQueryData(['users', res.user.id, 'cards'], (currentCards: CardProps[]) => {
        if (!currentCards) return;
        const indexOfObject = currentCards.findIndex(object => {
          return object.id === res.user.id;
        });

        currentCards.splice(indexOfObject, 1);
        return currentCards;
      });

      enqueueSnackbar(`${res.user.firstName} has been removed`, { variant: 'warning' });
    },
  });

  const loading = loadingAllUsers || isRemoving || isAdding;

  return (
    <Card>
      <CardHeader title="Users" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Autocomplete
          multiple
          loading={loading}
          options={data || []}
          value={users}
          getOptionLabel={(option: User) => `${option.firstName} ${option.lastName}`}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => (
            <TextField
              {...params}
              label={`Users who have ${card.name}`}
              placeholder="Add card to users collection"
            />
          )}
          onChange={(_event, value, reason, detail) => {
            if (detail?.option) {
              setUsers(value);
              if (reason === 'selectOption') {
                addCardToUserAsync(detail?.option.id);
              }
              if (reason === 'removeOption') {
                removeUser(detail?.option.id);
              }
            }
          }}
        />
      </CardContent>
    </Card>
  );
};
