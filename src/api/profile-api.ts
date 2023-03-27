import { instance } from './instance';
import {ProfileType} from '../store/profile-reducer';

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
  updatedUser: ProfileType;
};
