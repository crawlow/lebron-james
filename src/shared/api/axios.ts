import { NotificationBus, NotificationMessage } from '@/features';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru',
});

api.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    // Общий обработчик ошибок для всех запросов
    const notification = new NotificationBus();
    notification.Show(NotificationMessage.Error(error.response?.data?.title));
    return Promise.reject(error);
  }
);

export const noAuthApi = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru',
});
