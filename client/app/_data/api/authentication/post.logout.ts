import { methodDefault } from '../methodDefault';

interface Response {
  message?: string;
  detail?: string;
}

export const postLogout = async (): Promise<Response> =>
  methodDefault<Response>('authorization/logout', {
    method: 'POST',
    body: JSON.stringify({}),
  });
