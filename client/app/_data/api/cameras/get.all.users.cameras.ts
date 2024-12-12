import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Response = {
  cameras: Camera[];
  detail?: string;
};

export const getAllUsersCameras = async (): Promise<Response> =>
  methodDefault<Response>('cameras/user/all', {
    method: 'GET',
  });
