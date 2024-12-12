import { User } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  id: Pick<User, 'id'>;
  body: Pick<
    User,
    | 'email'
    | 'first_name'
    | 'last_name'
    | 'paternal_name'
    | 'phone_number'
    | 'role'
    | 'password'
    | 'ban'
  >;
}

type Response = {
  detail?: string;
};

export const editUser = async ({ id, body }: Params): Promise<Response> =>
  methodDefault<Response>(`users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  });
