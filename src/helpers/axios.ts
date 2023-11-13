import axiosRaw from 'axios';

const axios = axiosRaw.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/`,
});

type Requests = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RequestColors = {
  [key in Requests]: string;
};

const requestColors: RequestColors = {
  GET: '#27ae60',
  POST: '#f1c40f',
  PATCH: '#f1c40f',
  PUT: '#2980b9',
  DELETE: '#e74c3c',
};

axios.interceptors.request.use(request => {
  if (request.method) {
    const method = request.method.toUpperCase() as Requests;
    console.log(
      `%c${request.method.toUpperCase()} %cfor ${request.baseURL}${request.url}`,
      `color: ${requestColors[method]}`,
      'color: default'
    );
  }

  return request;
});

export default axios;
