// 📌 สร้าง Axios Instance
import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API ,
    headers: {
      'Content-Type': 'application/json',
    },
    
  });

// 📌 Middleware: เพิ่ม Authorization Header โดยอัตโนมัติ
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 📌  ฟังก์ชันจัดการ Error
  const handleApiError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      throw new AxiosError(err.response?.data || err.message, err.response?.status?.toString() || '500', err.config, err.request, err.response);
    }else{
      throw err;
    }
    
  };

  export  {api,handleApiError} ;
