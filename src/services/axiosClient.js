import axios from 'axios';
const axiosClient = axios.create({
        baseURL:'https://task-manager.test/api/v1/',
        headers:{
          'Content-Type':'application/json'
        }
    });

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
})

export default axiosClient;