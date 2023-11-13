import axios from 'helpers/axios';

export const getUsers = async () => {
  const response = await axios.get('api/users');

  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const createUser = async ({ ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('something went wrong');
  }

  return response.json();
};

export const getUser = async (userId: string) => {
  const response = await axios.get(`api/users/${userId}`);
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const updateUser = async (userId: string, values: any) => {
  const response = await axios.put(`api/users/${userId}`, JSON.stringify(values), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`api/users/${userId}`);
  if (response.status !== 200) {
    throw new Error('Something went wrong.');
  }

  return response.data;
};
