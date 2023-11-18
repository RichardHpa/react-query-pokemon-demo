import { useState, useEffect } from 'react';

import { Autocomplete, TextField, Card, CardHeader, CardContent } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getUsers } from 'api/Users';
import { addCardToUser, getUsersWhoOwnCard, removeCardFromUser } from 'api/UsersCards';

import type { FC } from 'react';
import type { User } from 'types/user';
import type { Card as CardProps } from 'types/card';

interface SelectUsersProps {
  card: CardProps;
}

export const SelectUsers: FC<SelectUsersProps> = ({ card }) => {
  // const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>([]);
  const { data, isLoading: loadingAllUsers } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { data: matchedUsers, isLoading: loadingMatches } = useQuery({
    queryKey: ['cards', card.id, 'users'],
    queryFn: () => getUsersWhoOwnCard(card.id!),
  });

  useEffect(() => {
    if (matchedUsers) {
      setUsers(matchedUsers);
    }
  }, [matchedUsers]);
  // const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { mutateAsync: addUser, isPending } = useMutation({
    mutationFn: (id: string) => addCardToUser({ userId: id, cardId: card.id! }),
    onSuccess: res => {
      // queryClient.setQueryData(['card', res.id], () => res);
      // queryClient.setQueryData(['cards'], (old: Card[]) => {
      //   if (!old) return;
      //   old.push(res);
      //   return old;
      // });
      // navigate(`/cards/${res.id}`);
    },
  });

  const { mutateAsync: removeUser } = useMutation({
    mutationFn: (userId: string) => removeCardFromUser({ userId, cardId: card.id! }),
    onSuccess: res => {
      console.log(res);
      // queryClient.setQueryData(['card', res.id], () => res);
      // queryClient.setQueryData(['cards'], (old: Card[]) => {
      //   if (!old) return;
      //   old.push(res);
      //   return old;
      // });
      // navigate(`/cards/${res.id}`);
    },
  });

  const loading = loadingAllUsers;

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
                addUser(detail?.option.id);
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
