import axios from 'axios';

const crypt = new Buffer('luisrodriguesds:97646060ita');
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: 'Basic ' + crypt.toString('base64'),
  },
});

export default api;
