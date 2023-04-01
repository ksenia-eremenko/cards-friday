import {AddNewPackDatatype, packsAPI, UpdatePackDataType} from '../api/packs-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setAppStatus, SetAppStatusActionType} from './app-reducer';
import {AppThunkType} from './store';

type InitStateType = {
    cardPacks: PackType[],
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    name: string,
    deckCover: string,
    private: boolean
    queryParams: {
        pageCount: number,
        page: number,
        min: number,
        max: number,
        user_id: string,
        packName: string,
        sortPacks: string,
    },
    isReset?: boolean
}

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    name: '',
    deckCover: '',
    private: false,
    queryParams: {
        pageCount: 10,
        page: 1,
        min: 0,
        max: 110,
        user_id: '',
        packName: '',
        sortPacks: '',
    },
    isReset: false
};

export const PacksReducer = (state: InitStateType = initState, action: PacksActionsType): InitStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state,
                cardPacks: action.payload.cardPacks,
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
            }
        case 'PACKS/SET-SEARCH':
            return {
                ...state, queryParams: {...state.queryParams, packName: action.payload}
            }
        case 'PACKS/SET_USER_ID':
            return {
                ...state,
                queryParams: {...state.queryParams, user_id: action.payload},
            };
        case 'PACKS/SET-MIN':
            return {
                ...state,
                queryParams: {...state.queryParams, min: action.payload}
            };
        case 'PACKS/SET-MAX':
            return {
                ...state,
                queryParams: {...state.queryParams, max: action.payload}
            };
        case 'PACKS/SET-CURRENT-PAGE':
            return {
                ...state, queryParams: {...state.queryParams, page: action.page}
            };
        case 'PACKS/SET-PAGE-COUNT':
            return {
                ...state,
                queryParams: {...state.queryParams, pageCount: action.pageCount}
            }
        case 'PACKS/SET-SORT-PACKS':
            return {
                ...state,
                queryParams: {...state.queryParams, sortPacks: action.payload},
            };

        case 'PACKS/RESET-FILTER':
            const tests = action.payload ? {
                ...state.queryParams,
                user_id: '',
                packName: '',
                min: 0,
                max: 110
            } : {...state.queryParams}
            return {
                ...state,
                queryParams: tests,
                isReset: action.payload

            }
        case 'PACKS/UPDATE_PACK':
            return {
                ...state,
                cardPacks: [...state.cardPacks.map(pack => pack._id === action.newPack._id
                    ? {...action.newPack}
                    : pack)],
            }
        case 'PACK/DELETE-CURRENT-PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId)
            }
        case 'PACK/CREATED-PACK':
            return {
                ...state,
                cardPacks: [action.newPack, ...state.cardPacks]
            }
        default: {
            return state;
        }
    }
};

// AC
export const setPacks = (data: PacksType) => ({type: 'PACKS/SET-PACKS', payload: {...data}} as const)
export const setSearch = (packName: string) => ({type: 'PACKS/SET-SEARCH', payload: packName} as const)
export const setUserId = (user_id: string) => ({type: 'PACKS/SET_USER_ID', payload: user_id} as const);
export const setMin = (min: number) => ({type: 'PACKS/SET-MIN', payload: min} as const);
export const setMax = (max: number) => ({type: 'PACKS/SET-MAX', payload: max} as const);
export const setCurrentPage = (page: number) => ({type: 'PACKS/SET-CURRENT-PAGE', page} as const)
export const setPageCount = (pageCount: number) => ({type: 'PACKS/SET-PAGE-COUNT', pageCount} as const)
export const setSortPacks = (sortPacks: string) => ({type: 'PACKS/SET-SORT-PACKS', payload: sortPacks} as const);
export const resetFilter = (isReset?: boolean) => ({type: 'PACKS/RESET-FILTER', payload: isReset} as const);
export const updatePack = (newPack: PackType) => ({type: 'PACKS/UPDATE_PACK', newPack,} as const)
export const deleteCurrentPack = (packId: string) => ({type: 'PACK/DELETE-CURRENT-PACK', packId} as const)
export const createdNewPack = (newPack: PackType) => ({type: 'PACK/CREATED-PACK', newPack} as const)


//types
export type PackType = {
    _id: string
    user_id: string | null
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade: number
    shots: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated: string
    more_id?: string
    __v?: number
    deckCover: string
}
type PacksType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
}
// type InitStateType = typeof initState;
type SetPacksType = ReturnType<typeof setPacks>;
type SetSearchType = ReturnType<typeof setSearch>
type SetUserIdType = ReturnType<typeof setUserId>
type SetMinType = ReturnType<typeof setMin>
type SetMaxType = ReturnType<typeof setMax>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetPageCountActionType = ReturnType<typeof setPageCount>
type SetSortPacksType = ReturnType<typeof setSortPacks>;
type ResetFilterType = ReturnType<typeof resetFilter>;
type UpdatePackType = ReturnType<typeof updatePack>
type DeleteCurrentPackType = ReturnType<typeof deleteCurrentPack>
type CreatedNewPackType = ReturnType<typeof createdNewPack>


type PacksActionsType = SetPacksType
    | SetAppStatusActionType
    | SetSearchType
    | SetUserIdType
    | SetMinType
    | SetMaxType
    | SetCurrentPageActionType
    | SetPageCountActionType
    | SetSortPacksType
    | ResetFilterType
    | UpdatePackType
    | DeleteCurrentPackType
    | CreatedNewPackType


//thunks
export const getPacks = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    try {
        const {pageCount, page, min, max, user_id, packName, sortPacks} = getState().packs.queryParams
        const res = await packsAPI.getPacks({
            page,
            pageCount,
            user_id,
            min,
            max,
            sortPacks,
            packName
        })
        dispatch(setPacks(res.data));
        dispatch(setMax(res.data.queryParams.max))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const deletePack = (packId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        const res = await packsAPI.deletePack(packId);
        dispatch(deleteCurrentPack(res.data.deletedCardsPack._id))
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
export const createdPack = (data: AddNewPackDatatype): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        await packsAPI.createPack(data);
        dispatch(getPacks());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
export const updatedPack = (data: UpdatePackDataType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        await packsAPI.updatedPack(data);
        dispatch(getPacks());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};


