import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<Camera, 'id'>;

type Response = {
  stream: string;
  detail?: string;
};

export const getStreamStartCamera = async ({ id }: Params): Promise<Response> =>
  methodDefault<Response>(`stream/start/${id}`, {
    method: 'GET',
  });
