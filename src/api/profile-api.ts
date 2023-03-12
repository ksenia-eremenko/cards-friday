import { instance } from './instance';

export const profileAPI = {
  editUserData(data: EditDataUserType) {
    return instance.put<'', UpdateResponseType, EditDataUserType>('/auth/me', data);
  },
};

export type EditDataUserType = {
  name: string;
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
