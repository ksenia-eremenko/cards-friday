import {
    CardLearnType,
    cardsAPI,
    cardType,
    CreateDataType,
    UpdateCardType,
    UpdatedGradeCartType
} from "../api/cards-api";
import { handleServerNetworkError } from "../utils/error-utils";
import { setAppStatus, SetAppStatusActionType } from "./app-reducer";
import { AppThunkType, RootStateType } from "./store";

const initState = {
    cards: [] as cardType[],
    cardsTotalCount: 0,
    packUserId: '',
    cardsPack_id: '',
    packName:'',
    queryParams: {
        cardQuestion: '',
        page: 1,
        pageCount: 5,
        sortCards: '',
    }
};

export const CardsReducer = (state: InitStateType = initState, action: CardsActionsType): InitStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return { ...state, cards: action.payload.cards, cardsTotalCount: action.payload.cardsTotalCount,packName:action.payload.packName }
        case 'CARDS/GET-PACKS-ID':
            return { ...state, cardsPack_id: action.id }
        case 'SET-CURRENT-PACK-NAME':
            return { ...state, packName: action.packName }
        case 'CARDS/GET-PACK-USER-ID':
            return { ...state, packUserId: action.packUserId }
        case 'CARDS/SET-CURRENT-PAGE':
            return { ...state, queryParams: { ...state.queryParams, page: action.page } }
        case 'CARDS/SET-PAGE-COUNT':
            return { ...state, queryParams: { ...state.queryParams, pageCount: action.pageCount } }
        case 'CARDS/SET-SORT-CARDS':
            return {
                ...state,
                queryParams: { ...state.queryParams, sortCards: action.sortCards },
            };
        case 'CARDS/SET-SEARCH-CARDS':
            return { ...state, queryParams: { ...state.queryParams, cardQuestion: action.cardQuestion } }
        case 'CARD/SET-UPDATE-GRADE-CARD':
            return {
                ...state,
                cards: state.cards.map(el=> el._id === action.data.card_id ? {...el, grade: action.data.grade, shots: action.data.shots}
                : el)
            }

        default: {
            return state;
        }
    }
};

type InitStateType = typeof initState;
type SetCardsType = ReturnType<typeof setCards>;
type GetPackIdType = ReturnType<typeof getPackId>;
type GetPackUserIdType = ReturnType<typeof getPackUserId>;
type SetCurrentCardsPage = ReturnType<typeof setCurrentCardsPage>;
type SetCardsPageCount = ReturnType<typeof setCardsPageCount>
type SetSortCards = ReturnType<typeof setSortCards>
type SetSearchCards = ReturnType<typeof setSearchCards>
type SetCurrentPackName = ReturnType<typeof setCurrentPackName>
type SetUpdateGradeCard = ReturnType<typeof setUpdateGradeCard>
type CardsActionsType = SetCardsType | SetAppStatusActionType | GetPackIdType | SetCurrentCardsPage | SetCardsPageCount | SetSortCards | SetSearchCards | GetPackUserIdType | SetCurrentPackName | SetUpdateGradeCard

// AC
export const setCards = (data: any) => ({ type: 'CARDS/SET-CARDS', payload: data} as const)
export const getPackId = (id: string) => ({ type: 'CARDS/GET-PACKS-ID', id } as const)
export const setCurrentCardsPage = (page: number) => ({ type: 'CARDS/SET-CURRENT-PAGE', page } as const)
export const setCardsPageCount = (pageCount: number) => ({ type: 'CARDS/SET-PAGE-COUNT', pageCount } as const)
export const setSortCards = (sortCards: string) => ({ type: 'CARDS/SET-SORT-CARDS', sortCards } as const);
export const setSearchCards = (cardQuestion: string) => ({ type: 'CARDS/SET-SEARCH-CARDS', cardQuestion } as const)
export const getPackUserId = (packUserId: string) => ({ type: 'CARDS/GET-PACK-USER-ID', packUserId } as const)
export const setCurrentPackName = (packName: string) => ({ type: 'SET-CURRENT-PACK-NAME', packName } as const)
export const setUpdateGradeCard = (data: UpdatedGradeCartType ) => ({type:  'CARD/SET-UPDATE-GRADE-CARD', data }as const)


// TC
export const getCards = (cardsPack_id: string): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    try {
        const { cardQuestion, page, pageCount, sortCards } = getState().cards.queryParams
        const res = await cardsAPI.getCards({
            //@ts-ignore
            cardsPack_id,
            cardQuestion,
            sortCards,
            page,
            pageCount,
        })

        dispatch(setCards(res.data));
        dispatch(getPackUserId(res.data.packUserId));
        dispatch(setCurrentPackName(res.data.packName));
        dispatch(getPackId(cardsPack_id))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const createdCard = (card: CreateDataType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        const res = await cardsAPI.createCard(card);
        dispatch(getCards(res.data.newCard.cardsPack_id))
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};

export const deleteCard = (cardId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        const res = await cardsAPI.deleteCard(cardId);
        dispatch(getCards(res.data.deletedCard.cardsPack_id))
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};
export const updateCard = (cardId: UpdateCardType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        const res = await cardsAPI.updateCard(cardId);
        dispatch(getCards(res.data.updatedCard.cardsPack_id))
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};

export const updateGradeCard = (data: CardLearnType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        const res = await cardsAPI.updateGradeCard(data);
        dispatch(setUpdateGradeCard(res.data.updatedGrade));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};



