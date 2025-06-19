import client from './client';

const setupInterceptors = () => {
  client.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['X-Token'] = '9D1F7897-BCF4-4E7B-81E4-5D8AC262C190';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
