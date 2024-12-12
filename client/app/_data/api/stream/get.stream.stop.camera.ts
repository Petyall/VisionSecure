import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<Camera, 'id'>;

type Response = {
  stream: string;
  detail?: string;
};

export const getStreamStopCamera = async ({ id }: Params): Promise<Response> =>
  methodDefault<Response>(`stream/stop/${id}`, {
    method: 'GET',
  });
