import { User } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = {
  body: Pick<
    User,
    | 'first_name'
    | 'last_name'
    | 'paternal_name'
    | 'email'
    | 'phone_number'
    | 'password'
    | 'role'
  >;
}

interface Response {
  message?: string;
  detail?: string;
}

export const postSignUp = async (body: Params): Promise<Response> =>
  methodDefault<Response>('authorization/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
