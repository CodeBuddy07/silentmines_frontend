import axios from 'axios';

export const useAxios = axios.create({
  // baseURL: 'https://joyscelond-backend.onrender.com',
  baseURL: 'http://localhost:5001/api',
  // withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
});



export default useAxios;