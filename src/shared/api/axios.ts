import { NotificationBus, NotificationMessage } from '@/features';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env?.VUE_APP_STATISTICS_URL,
});

api.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const token = JSON.parse(user).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    // Общий обработчик ошибок для всех запросов
    console.log('error', error);

    const notification = new NotificationBus();
    notification.Show(
      NotificationMessage.Error(
        error.response?.data?.title || error.response?.data
      )
    );
    return Promise.reject(error);
  }
);

export const noAuthApi = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru',
});
