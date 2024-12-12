import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<Camera, 'id'>;

type Response = {
  detail?: string;
  success?: boolean;
};

export const postAddFavoriteCamera = async ({
  id,
}: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/favorite/add`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
