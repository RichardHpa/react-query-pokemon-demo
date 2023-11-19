import axios from 'helpers/axios';

export const getTotalValue = async () => {
  const response = await axios.get('api/stats/totalValue');

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};
