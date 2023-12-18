import { api } from '@/shared';
import { defineStore } from 'pinia';
import { RequestPlayerModel } from '../models/RequestPlayerModel';
import { PlayerModel, PlayerListModel } from '../models';
import { readonly, ref } from 'vue';

export const usePlayerStore = defineStore('player-store', () => {
  const positions = ref<Array<string>>();
  const getPlayers = async (
    req: RequestPlayerModel
  ): Promise<PlayerListModel> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get('/api/Player/GetPlayers', {
          params: req,
        });
        if (data && data.data) {
          return resolve(
            new PlayerListModel({
              count: data.count,
              players: data.data.map((x: any) => new PlayerModel(x)),
            })
          );
        }
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const addPlayer = async (req: PlayerModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post('/api/Player/Add', req);
        if (data) {
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const updatePlayer = async (req: PlayerModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.put('/api/Player/Update', req);
        if (data) {
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const getPlayer = async (id: number): Promise<PlayerModel> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get('/api/Player/Get', {
          params: {
            id: id,
          },
        });
        if (data) {
          data.birthday = data.birthday ? new Date(data.birthday) : undefined;
        }
        return resolve(data);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const deletePlayer = async (id: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.delete('/api/Player/Delete', {
          params: {
            id: id,
          },
        });
        if (data) {
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const getPositions = async (): Promise<Array<string>> => {
    return new Promise(async (resolve, reject) => {
      if (positions.value) {
        return resolve(positions.value);
      }
      try {
        const { data } = await api.get('/api/Player/GetPositions');
        if (data) {
          positions.value = data;
        }
        return resolve(data);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  return {
    positions: readonly(positions),
    getPlayers,
    getPlayer,
    addPlayer,
    updatePlayer,
    deletePlayer,
    getPositions,
  };
});
