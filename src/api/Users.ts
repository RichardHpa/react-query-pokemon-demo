export const getUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`);

  if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  return response.json();
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
