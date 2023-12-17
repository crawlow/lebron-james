import { api } from '@/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FilterTeamsModel, TeamModel } from '../models';
import { NotificationBus } from '@/features';

export const useTeamsStore = defineStore('teams-store', () => {
  const getTeams = async (req: FilterTeamsModel): Promise<Array<TeamModel>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get('/api/Team/GetTeams', {
          params: {
            PageSize: req.page.size,
            Page: req.page.page,
            Name: req.search,
          },
        });
        if (data && data.data) {
          console.log(
            '11',
            data.data.map((x: any) => new TeamModel(x))
          );

          return resolve(data.data.map((x: any) => new TeamModel(x)));
        }
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const addTeam = async (req: TeamModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post('/api/Team/Add', req);
        if (data) {
          console.log('AddTeam', data);
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const updateTeam = async (req: TeamModel): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.put('/api/Team/Update', req);
        if (data) {
          console.log('AddTeam', data);
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const getTeam = async (id: number): Promise<TeamModel> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get('/api/Team/Get', {
          params: {
            id: id,
          },
        });
        if (data) {
          console.log('getTeam', data);
        }
        return resolve(data);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  const deleteTeam = async (id: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.delete('/api/Team/Delete', {
          params: {
            id: id,
          },
        });
        if (data) {
          console.log('getTeam', data);
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  return {
    getTeams,
    addTeam,
    updateTeam,
    getTeam,
    deleteTeam,
  };
});
