import { methodDefault } from '../methodDefault';

interface Response {
  message?: string;
  detail?: string;
}

export const postRefreshToken = async (): Promise<Response> =>
  methodDefault<Response>('authorization/refresh_token', {
    method: 'POST',
    body: JSON.stringify({}),
  });
