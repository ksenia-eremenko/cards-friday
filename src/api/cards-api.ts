import { instance } from './instance';

export const cardsAPI = {
  getCards(params: GetParamsType) {
    return instance.get<ResponseCardsType>('/cards/card', { params });
  },
  createCard(card: CreateDataType) {
    return instance.post('/cards/card', { card });
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`);
  },
  updateCard(card: UpdateCardType) {
    return instance.put('/cards/card', { card });
  }
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

export type ResponseCardsType = {
  cards: cardType[],
  cardsTotalCount: number,
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}

export type cardType = {
  answer: string
  question: string
  packName: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}