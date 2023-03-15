
import { instance } from './instance';

export const packsAPI = {
  getPacks(params: GetParamsPacksType) {
    return instance.get('/cards/pack', { params: { ...params } });
  },
  deletePack(packId: string) {
    return instance.delete(`/cards/pack?id=${packId}`);
  },
  createPack(name: string) {
    return instance.post('/cards/pack', {
      cardsPack: { name },
    });
  },
  updatedPack(_id: string, name: string) {
    return instance.put('/cards/pack', {
      cardsPack: { _id, name },
    });
  },
};

export type GetParamsPacksType = {
  page: number
  pageCount: number
  user_id: string
  min: number
  max: number
  sortPacks: string
  packName: string
};
// export type GetParamsPacksType = any;