
import { User } from '../../types';
import { methodDefault } from '../methodDefault';

interface Response {
  user?: User;
  detail?: string;
}

export const postValidCheck = async (token: string): Promise<Response> =>
  methodDefault<Response>('authorization/valid_check', {
    method: 'POST',
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization: `${token}`,
    },
  });