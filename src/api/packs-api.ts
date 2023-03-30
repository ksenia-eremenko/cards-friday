import {instance} from './instance';
import {AxiosResponse} from "axios";

export const packsAPI = {
    getPacks(params: GetParamsPacksType) {
        return instance.get('/cards/pack', {params});
    },
    deletePack(packId: string) {
        return instance.delete<DeletedPackResponse>(`/cards/pack?id=${packId}`);
    },
    createPack(data: AddNewPackDatatype) {
        return instance.post<AddNewPackDatatype, AddNewPackResponseType>('/cards/pack', {
            cardsPack: data,
        });
    },
    updatedPack(cardsPack: UpdatePackDataType) {
        return instance.put<UpdatePackDataType, AxiosResponse<UpdatePackResponseType>>('/cards/pack', cardsPack);
    },
};
export type UpdatePackDataType = {
    cardsPack: {
        _id: string
        name: string
        deckCover?: string
    }
}

export type UpdatePackResponseType = {
    updatedCardsPack: PackResponseType
    token: string
    tokenDeathTime: number
}

export type AddNewPackDatatype = {
    name: string
    deckCover?: string
    private?: boolean
}
export type AddNewPackResponseType = {
    newCardsPack: PackResponseType
    token: string
    tokenDeathTime: number
}

export type PacksDataType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
    deckCover: string
}
export type PackResponseType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover?: any
}


export type GetParamsPacksType = {
    page: number
    pageCount: number
    user_id: string
    min: number
    max: number
    sortPacks: string
    packName: string
};


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
