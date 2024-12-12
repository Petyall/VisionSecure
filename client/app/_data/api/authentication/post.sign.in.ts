import { User } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<User, 'email' | 'password'>;

interface Response {
  access_token?: string;
  message?: string;
  detail?: string;
}

export const postSignIn = async ({
  email,
  password,
}: Params): Promise<Response> =>
  methodDefault<Response>('authorization/login', {
    method: 'POST',
    body: { email, password },
  });
