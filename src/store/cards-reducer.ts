import { cardsAPI, CreateDataType } from "../api/cards-api";
import { handleServerNetworkError } from "../utils/error-utils";
import { setAppStatus, SetAppStatusActionType } from "./app-reducer";
import { AppThunkType, RootStateType } from "./store";

const initState = {
    cards: [],
    maxCardsCount: 0,
    cardsPack_id: '',
    queryParams: {
        cardQuestion: '',
        page: 1,
        pageCount: 9,
        sortCards: '',
    }
};

export const CardsReducer = (state: InitStateType = initState, action: CardsActionsType): InitStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return { ...state, cards: action.payload.cards }
        case 'CARDS/GET-PACKS-ID':
            return { ...state, cardsPack_id: action.id }
        default: {
            return state;
        }
    }
};

type InitStateType = typeof initState;
type SetCardsType = ReturnType<typeof setCards>;
type GetPackIdType = ReturnType<typeof getPackId>;
type CardsActionsType = SetCardsType | SetAppStatusActionType | GetPackIdType

// AC
export const setCards = (data: any) => ({ type: 'CARDS/SET-CARDS', payload: { ...data } } as const)
export const getPackId = (id: string) => ({ type: 'CARDS/GET-PACKS-ID', id } as const)


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

export const createdCard = (card: CreateDataType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'));
    try {
        await cardsAPI.createCard(card);
        dispatch(getCards());
        dispatch(setAppStatus('succeeded'));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
        dispatch(setAppStatus('failed'))
    }
};

