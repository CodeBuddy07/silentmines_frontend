import axios from 'axios';

export const useAxios = axios.create({
  // baseURL: 'https://joyscelond-backend.onrender.com',
  baseURL: 'https://server.greenlove.fun/api',
  // withCredentials: false
  // withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
});



export default useAxios;