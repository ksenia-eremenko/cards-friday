import { packsAPI } from '../api/packs-api';
import { handleServerNetworkError } from '../utils/error-utils';
import { setAppStatus, SetAppStatusActionType } from './app-reducer';
import { AppThunkType, RootStateType } from './store';

type InitStateType = {
    cardPacks: PackType[],
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    queryParams: {
        pageCount: number, // кол-во на странице
        page: number, // текущая
        min: number, // кол-во карт от
        max: number, //кол-во карт до
        user_id: string, // для фильтрации карточек мои / не мои
        packName: string, //для поиска
        sortPacks: string, // для сортировки 0 | 1 и рядом пишем имя поля которое сортируем
    }
}

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    queryParams: {
        pageCount: 10, // кол-во на странице
        page: 1, // текущая
        min: 0, // кол-во карт от
        max: 10, //кол-во карт до
        user_id: '', // для фильтрации карточек мои / не мои
        packName: '', //для поиска
        sortPacks: '', // для сортировки 0 | 1 и рядом пишем имя поля которое сортируем
    }
};

export const PacksReducer = (state: InitStateType = initState, action: PacksActionsType): InitStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return { ...state, cardPacks: action.payload.cardPacks, cardPacksTotalCount: action.payload.cardPacksTotalCount }
        case 'PACKS/SET-SEARCH':
            return {
                ...state, queryParams: { ...state.queryParams, packName: action.payload }
            }
        case 'PACKS/SET_USER_ID':
            return {
                ...state,
                queryParams: { ...state.queryParams, user_id: action.payload },
            };
        case 'PACKS/SET-MIN':
            return {
                ...state,
                queryParams: { ...state.queryParams, min: action.payload },
            };
        case 'PACKS/SET-MAX':
            return {
                ...state,
                queryParams: { ...state.queryParams, max: action.payload },
            };
        case 'PACKS/SET-CURRENT-PAGE':
            return {
                ...state, queryParams: { ...state.queryParams, page: action.page }
            };
        case 'PACKS/SET-PAGE-COUNT':
            return {
                ...state,
                queryParams: { ...state.queryParams, pageCount: action.pageCount }
            }
        case 'PACKS/SET-SORT-PACKS':
            return {
                ...state,
                queryParams: { ...state.queryParams, sortPacks: action.payload },
            };
        default: {
            return state;
        }
    }
};

// AC
export const setPacks = (data: PacksType) => ({ type: 'PACKS/SET-PACKS', payload: { ...data } } as const)
export const setSearch = (packName: string) => ({ type: 'PACKS/SET-SEARCH', payload: packName } as const)
export const setUserId = (user_id: string) => ({ type: 'PACKS/SET_USER_ID', payload: user_id } as const);
export const setMin = (min: number) => ({ type: 'PACKS/SET-MIN', payload: min } as const);
export const setMax = (max: number) => ({ type: 'PACKS/SET-MAX', payload: max } as const);
export const setCurrentPage = (page: number) => ({ type: 'PACKS/SET-CURRENT-PAGE', page } as const)
export const setPageCount = (pageCount: number) => ({ type: 'PACKS/SET-PAGE-COUNT', pageCount } as const)
export const setSortPacks = (sortPacks: string) => ({ type: 'PACKS/SET-SORT-PACKS', payload: sortPacks } as const);


//types
export type PackType = {
    _id: string;
    user_id: string | null;
    name: string;
    user_name: string;
    cardsCount: number;
    created: string;
    updated: string;
    grade: number;
    rating: number;
    shots: number;
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
// type ResetUserIdType = ReturnType<typeof resetUserId>

type PacksActionsType = SetPacksType
    | SetAppStatusActionType
    | SetSearchType
    | SetUserIdType
    | SetMinType
    | SetMaxType
    | SetCurrentPageActionType
    | SetPageCountActionType
    | SetSortPacksType


//thunks
export const getPacks = (userId?: string): AppThunkType => async (dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatus('loading'))
    console.log(userId)
    console.log(getState().packs)
    try {
        const { pageCount, page, min, max, user_id, packName, sortPacks } = getState().packs.queryParams
        const res = await packsAPI.getPacks({
            page,
            pageCount,
            user_id: userId ? userId : '',
            min,
            max,
            sortPacks,
            packName
        })
        console.log(res.data)
        dispatch(setPacks(res.data));
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
        await packsAPI.deletePack(packId);
        dispatch(getPacks());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
export const createdPack = (name: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        await packsAPI.createPack(name);
        dispatch(getPacks());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
export const updatedPack = (id: string, name: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        await packsAPI.updatedPack(id, name);
        dispatch(getPacks());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
