import { cardsAPI, CreateDataType, UpdateCardType } from "../api/cards-api";
import { handleServerNetworkError } from "../utils/error-utils";
import { setAppStatus, SetAppStatusActionType } from "./app-reducer";
import { AppThunkType, RootStateType } from "./store";

const initState = {
    cards: [],
    cardsTotalCount: 0,
    cardsPack_id: '',
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
            return { ...state, cards: action.payload.cards, cardsTotalCount: action.payload.cardsTotalCount }
        case 'CARDS/GET-PACKS-ID':
            return { ...state, cardsPack_id: action.id }
        case 'CARDS/SET-CURRENT-PAGE':
            return {...state, queryParams: {...state.queryParams, page: action.page}}
        case 'CARDS/SET-PAGE-COUNT':
            return {...state, queryParams: {...state.queryParams, pageCount: action.pageCount}}
        default: {
            return state;
        }
    }
};

type InitStateType = typeof initState;
type SetCardsType = ReturnType<typeof setCards>;
type GetPackIdType = ReturnType<typeof getPackId>;
type SetCurrentCardsPage = ReturnType<typeof setCurrentCardsPage>;
type SetCardsPageCount = ReturnType<typeof setCardsPageCount>
type CardsActionsType = SetCardsType | SetAppStatusActionType | GetPackIdType | SetCurrentCardsPage | SetCardsPageCount

// AC
export const setCards = (data: any) => ({ type: 'CARDS/SET-CARDS', payload: { ...data } } as const)
export const getPackId = (id: string) => ({ type: 'CARDS/GET-PACKS-ID', id } as const)
export const setCurrentCardsPage = (page: number) => ({type: 'CARDS/SET-CURRENT-PAGE', page} as const)
export const setCardsPageCount = (pageCount: number) => ({type: 'CARDS/SET-PAGE-COUNT', pageCount} as const)


// TC
export const getCards = (cardsPack_id?: string): AppThunkType => async (dispatch, getState: () => RootStateType) => {
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
        //@ts-ignore
        dispatch(getPackId(cardsPack_id))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const createdCard = (card: CreateDataType): AppThunkType => async (dispatch, getState: () => RootStateType) => {
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


