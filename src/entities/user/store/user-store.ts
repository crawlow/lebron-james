import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';
import { UserModel } from '../models';

export const useUserStore = defineStore('user-store', () => {
  const currentUser = ref<UserModel>();
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(new UserModel(JSON.parse(user)));
    }
  };
  const setUser = (user: UserModel) => {
    currentUser.value = user;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };
  return {
    currentUser: readonly(currentUser),
    getCurrentUser,
    setUser,
  };
});
