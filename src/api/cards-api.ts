import { instance } from './instance';

export const cardsAPI = {
  getCards(params: GetParamsType) {
    return instance.get('/cards/card', { params: { ...params } });
  },
  createCard(card: CreateDataType) {
    return instance.post('/cards/card', { card });
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`);
  },
  updateCard(card: UpdateCardType) {
    return instance.put('/cards/card', { card });
  },
  rateCard(card: RateCardType) {
    return instance.put('/cards/grade', card);
  },
};

export type GetParamsType = {
  cardQuestion: string
  cardsPack_id: string
  page: number
  pageCount: number
  sortCards: any
};

export type CreateDataType = {
  cardsPack_id: string
  question: string
  answer: string
};

export type UpdateCardType = {
  _id: string
  question: string
};

export type RateCardType = {
  grade: number
  card_id: string
};
