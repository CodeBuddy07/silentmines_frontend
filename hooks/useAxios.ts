import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:5000/api',
});

const useAxios = () =>{
    return baseURL;
}

export default useAxios;