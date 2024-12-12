import { User } from '../../types';
import { methodDefault } from '../methodDefault';

type Response = {
  user?: Pick<
    User,
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'paternal_name'
    | 'phone_number'
    | 'email'
    | 'password'
    | 'role'
    | 'ban'
    | 'created_at'
    | 'updated_at'
  >;
  detail?: string;
};

export const getMySelfUser = async (): Promise<Response> =>
  methodDefault<Response>('users/me', {
    method: 'GET',
  });
