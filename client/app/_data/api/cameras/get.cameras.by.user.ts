import { User } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  user_id: Pick<User, 'id'>;
}

type Response = {
  user_id?: string;
  camera_id?: number;
  detail?: string;
};

export const getCamerasByUser = async ({
  user_id,
}: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/users/${user_id}`, {
    method: 'GET',
  });
