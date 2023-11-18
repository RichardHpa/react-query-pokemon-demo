import axios from 'helpers/axios';

export const addCardToUser = async ({ cardId, userId }: { cardId: string; userId: string }) => {
  const data = {
    cardId,
    userId,
  };
  const response = await axios.post(`api/addCardToUser`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const getUsersWhoOwnCard = async (cardId: string) => {
  const response = await axios.get(`api/addCardToUser/${cardId}`);

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const removeCardFromUser = async ({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) => {
  const response = await axios.delete(`api/addCardToUser/${cardId}`, { data: { userId } });
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};
