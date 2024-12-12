import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<Camera, 'id'>;

type Response = {
  success?: boolean;
  detail?: string;
};

export const deleteCamera = async ({ id }: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/${id}`, {
    method: 'DELETE',
  });
