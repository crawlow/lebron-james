import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

/**Стор приложения */
export const useTestStore = defineStore('test-store', () => {
  const test = ref();
  return {
    test,
  };
});
