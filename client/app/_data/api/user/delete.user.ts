import { User } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<User, 'id'>;

type Response = {
  detail?: string;
};

export const deleteUser = async ({ id }: Params): Promise<Response> =>
  methodDefault<Response>(`users/${id}`, {
    method: 'DELETE',
  });
