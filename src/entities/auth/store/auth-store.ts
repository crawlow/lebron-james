import { defineStore } from 'pinia';
import { AuthModel, RegisterModel } from '../models';
import { noAuthApi } from '@/shared';
import { NotificationBus, NotificationMessage } from '@/shared';
import { UserModel, useUserStore } from '@/entities/user';
const notification = new NotificationBus();

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
        notification.Show(
          NotificationMessage.Error(
            'User with the specified username / password was not found.'
          )
        );
        return resolve(false);
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
        if ((e as any).response.data.includes('duplicate key'))
          notification.Show(
            NotificationMessage.Error(
              'User with the specified login already exist.'
            )
          );
        return resolve(false);
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
