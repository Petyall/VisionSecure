import { User } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  user_id: Pick<User, 'id'>;
}

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

export const getUserById = async ({ user_id }: Params): Promise<Response> =>
  methodDefault<Response>(`users/${user_id}`, {
    method: 'GET',
  });
