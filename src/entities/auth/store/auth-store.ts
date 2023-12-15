import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AuthModel, RegisterModel } from '../models';
import { noAuthApi } from '@/shared';
import { NotificationBus, NotificationMessage } from '@/features';
import { UserModel, useUserStore } from '@/entities/user';

export const useAuthStore = defineStore('auth-store', () => {
  const signIn = async (req: AuthModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await noAuthApi.post('/api/Auth/SignIn', req);
        if (data) {
          const { setUser } = useUserStore();
          setUser(new UserModel(data));
        }
        return resolve(true);
      } catch (e) {
        const notification = new NotificationBus();
        notification.Show(
          NotificationMessage.Error(
            'User with the specified username / password was not found.'
          )
        );
        return reject(false);
      }
    });
  };
  const signUp = async (req: RegisterModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await noAuthApi.post('/api/Auth/SignUp', req);
        if (data) {
          const { setUser } = useUserStore();
          setUser(new UserModel(data));
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const signOut = async () => {
    return new Promise(async (resolve) => {
      localStorage.removeItem('user');
      const { setUser } = useUserStore();
      setUser(undefined);
      resolve(true);
    });
  };
  return {
    signIn,
    signUp,
    signOut,
  };
});
