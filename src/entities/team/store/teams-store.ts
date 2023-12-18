import { api } from '@/shared';
import { defineStore } from 'pinia';
import { RequestTeamsModel, TeamModel, TeamListModel } from '../models';
import { readonly, ref } from 'vue';

export const useTeamsStore = defineStore('teams-store', () => {
  const allTeams = ref<TeamListModel>();
  const getTeams = async (req?: RequestTeamsModel): Promise<TeamListModel> => {
    return new Promise(async (resolve, reject) => {
      if (!req && allTeams.value) {
        return resolve(new TeamListModel(allTeams.value));
      }
      try {
        const params = req
          ? {
              PageSize: req.page.size,
              Page: req.page.page,
              Name: req.search,
            }
          : undefined;
        const { data } = await api.get('/api/Team/GetTeams', { params });
        if (data && data.data) {
          const result = new TeamListModel({
            teams: data.data.map((x: any) => new TeamModel(x)),
            count: data.count,
          });
          if (!req && !allTeams.value) {
            allTeams.value = result;
          }
          return resolve(result);
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
          allTeams.value = undefined;
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
          allTeams.value = undefined;
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
          allTeams.value = undefined;
        }
        return resolve(true);
      } catch (e) {
        console.log('e', e);
        return reject(false);
      }
    });
  };
  return {
    allTeams: readonly(allTeams),
    getTeams,
    addTeam,
    updateTeam,
    getTeam,
    deleteTeam,
  };
});
