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
  },
  // updateGradeCard(data: CardLearnType) {
  //   return instance.put<ResponseCardsLearnType>('cards/grade', data)
  // },
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
  cardsPack_id?: string
  user_id?: string
  answer?: string
  question?: string
  grade?: number
  shots?: number
  comments?: string
  // type: QuestionType
  rating?: number
  more_id?: string
  created?: string
  updated?: string
  __v?: number
  answerImg?: string
  answerVideo?: string
  questionImg?: string
  questionVideo?: string
};


export type ResponseCardsType = {
  cards: cardType[],
  cardsTotalCount: number,
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
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

export type CardLearnType = {
  shots: number
  grade: number
  card_id: string
}

export type ResponseCardsLearnType = {
  updatedGrade: UpdatedGradeCartType
  token: string
  tokenDeathTime: number
}
export type UpdatedGradeCartType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
  more_id: string
  created: string
  updated: string
  __v: number
}

// export type UpdatedCardType = {
//   _id: string
//   cardsPack_id: string
//   user_id: string
//   answer: string
//   question: string
//   grade: number
//   shots: number
//   comments: string
//   // type: QuestionType
//   rating: number
//   more_id: string
//   created: string
//   updated: string
//   __v: number
//   answerImg: string
//   answerVideo: string
//   questionImg: string
//   questionVideo: string
// }