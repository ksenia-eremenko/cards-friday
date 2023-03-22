
import { instance } from './instance';

export const packsAPI = {
  getPacks(params: GetParamsPacksType) {
    return instance.get('/cards/pack', { params });
  },
  deletePack(packId: string) {
    return instance.delete<DeletedPackResponse>(`/cards/pack?id=${packId}`);
  },
  createPack(name: string) {
    return instance.post('/cards/pack', {
      cardsPack: { name },
    });
  },
  updatedPack(_id: string, name: string) {
    return instance.put<UpdatedPackResponse>('/cards/pack', {
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

export type UpdatedPackResponse = {
  updatedCardsPack: {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    grade: number
    shots: number
    cardsCount: number
    "created": string
    "updated": string
    "deckCover": null
  }
}

type DeletedPackResponse = {
  deletedCardsPack: {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    grade: number
    shots: number
    cardsCount: number
    "created": string
    "updated": string
    "deckCover": null
  }
}
