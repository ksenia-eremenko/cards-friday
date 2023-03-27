import { instance } from './instance';

export const profileAPI = {
  editUserData(data: EditDataUserType) {
    return instance.put<'', UpdateDataResponseType, EditDataUserType>('/auth/me', data);
  },
};

export type EditDataUserType = {
  name?: string
  avatar?: string
};

type UpdateDataResponseType = {
  data: UpdateResponseType
};
type UpdateResponseType = {
  updatedUser: UpdatedUserType;
};

export type UpdatedUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
};
