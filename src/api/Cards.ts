import axios from 'helpers/axios';

export const createCard = async ({ ...data }) => {
  const response = await axios.post(`api/cards`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const getCards = async () => {
  const response = await axios.get('api/cards');

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const getCard = async (cardId: string) => {
  const response = await axios.get(`api/cards/${cardId}`);
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const updateCard = async (cardId: string, values: any) => {
  const response = await axios.put(`api/cards/${cardId}`, JSON.stringify(values), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const deleteCard = async (cardId: string) => {
  const response = await axios.delete(`api/cards/${cardId}`);
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const updateCardPrice = async (apiCardId: string) => {
  const response = await axios.patch(`api/cards/${apiCardId}/updatePrice`);
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};
