import { api } from '@/shared';

export const loadFile = async (imageFile: FormData): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post('/api/Image/SaveImage', imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      resolve(process.env.VUE_APP_STATISTICS_URL + data);
    } catch (e) {
      reject(e);
      console.log('e', e);
    }
  });
};
