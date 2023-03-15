import { cardsAPI } from "../api/cards-api";
import { setAppStatus, SetAppStatusActionType } from "./app-reducer";
import { AppThunkType, RootStateType } from "./store";

const initState = {
    cards: [],
    cardsPack_id: '',
    maxCardsCount: 0,
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
            return { ...state, ...action.payload }
        default: {
            return state;
        }
    }
};

type InitStateType = typeof initState;
type SetCardsType = ReturnType<typeof setCards>;
type CardsActionsType = SetCardsType | SetAppStatusActionType 

// AC
export const setCards = (data: any) => ({ type: 'CARDS/SET-CARDS', payload: { ...data } } as const)

export const getCards = (cardsPack_id?: string): AppThunkType => async (dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatus('loading'))

    try {
        const { cardQuestion, page, pageCount, sortCards } = getState().cards.queryParams
        const res = await cardsAPI.getCards({
            // @ts-ignore
            cardsPack_id,
            cardQuestion,
            sortCards,
            page,
            pageCount,
        })
        dispatch(setCards(res.data));
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

