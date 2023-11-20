import { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Grid, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'utils/useDebounce';

import { Image } from 'components/Image';

import type { CardApi } from 'types/card';
import type { FC } from 'react';

export const getApiSuggestions = async (word: string) => {
  const response = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
    params: {
      page: 1,
      pageSize: 6,
      q: `name:"${word}*"`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data.data;
};

interface PokemonApiSearchProps {
  onSelect: (card: CardApi | null) => void;
}

function useTodos(search: string) {
  return useQuery({
    queryKey: [
      'pokemonApi',
      {
        query: search,
      },
    ],
    queryFn: () => getApiSuggestions(search),
    enabled: false,
  });
  // the following can be used to avoid refetches on already fetched data (see paginated queries docs)
  // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
  // );
}

export const PokemonApiSearch: FC<PokemonApiSearchProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<CardApi | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CardApi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearch = useDebounce(inputValue, 500);

  const { isFetching, data, refetch } = useTodos(debouncedSearch);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);

  useEffect(() => {
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    setLoading(true);
  }, [inputValue]);

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    if (debouncedSearch && active) {
      setOptions([]);
      refetch();
    }
    return () => {
      active = false;
    };
  }, [debouncedSearch, inputValue, refetch, value]);

  useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  return (
    <Autocomplete
      filterOptions={x => x}
      options={options}
      getOptionLabel={option => (typeof option === 'string' ? option : option.name)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      open={open}
      clearOnBlur
      blurOnSelect
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      noOptionsText="No cards found"
      renderInput={params => (
        <TextField
          {...params}
          label="Search for card"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      loading={loading}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_event: any, newValue: CardApi | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onSelect(newValue);
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`${option.id}`}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item sx={{ display: 'flex', width: 60 }}>
                <Image src={option.images.small} alt={option.name} />
              </Grid>
              <Grid item>{option.name}</Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
