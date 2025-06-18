import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'X-Token': '9D1F7897-BCF4-4E7B-81E4-5D8AC262C190',
  },
});

export default api;
