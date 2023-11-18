import {
  Button,
  Grid,
  Card as MuiCard,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  CardContent,
  CardActions,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getCard, deleteCard } from 'api/Cards';
import { invariant } from 'helpers/invariant';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { SelectUsers } from './components/SelectUsers';

export const Card = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { cardId } = useParams();
  invariant(cardId);

  const { data, isLoading } = useQuery({
    queryKey: ['cards', cardId],
    queryFn: () => getCard(cardId),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteCard(cardId),
    onSuccess: () => {
      queryClient.setQueryData(['cards'], (old: any[]) => {
        if (!old) return;

        const indexOfObject = old.findIndex(object => {
          return object.id === cardId;
        });

        old.splice(indexOfObject, 1);
        return old;
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardId] });
      navigate('/cards');
    },
  });

  const isProcessing = isLoading || isPending;

  return (
    <div>
      <BreadcrumbHeader
        title={data?.name}
        loading={isLoading}
        actions={
          <Button
            variant="contained"
            component={Link}
            to={`/cards/${cardId}/edit`}
            disabled={isProcessing}
          >
            Edit Card
          </Button>
        }
        crumbs={[
          {
            label: 'Cards',
            path: '/cards',
          },
          {
            label: 'Card info',
          },
        ]}
      />

      {isLoading ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={data.image}
              width="100%"
              alt={data.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'images/cardBack.png';
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={4} sx={{ height: '100%' }}>
              <MuiCard>
                <CardHeader title="Card Details" titleTypographyProps={{ variant: 'h6' }} />
                <List>
                  <ListItem>
                    <ListItemText primary="Name" secondary={data.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Value" secondary={`$${data.value}`} />
                  </ListItem>
                </List>
              </MuiCard>

              <SelectUsers card={data} />

              <MuiCard>
                <CardHeader title="Delete card" titleTypographyProps={{ variant: 'h6' }} />
                <CardContent>
                  <Box
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="body2">
                      Deleting this card will remove it from the database as well as edit everyone's
                      collection values
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => mutateAsync()}
                    disabled={isProcessing}
                  >
                    Delete Card
                  </Button>
                </CardActions>
              </MuiCard>
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
