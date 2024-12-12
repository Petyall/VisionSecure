import { authenticationApi } from './authentication';
import { userApi } from './user';
import { camerasApi } from './cameras';
import { favoriteApi } from './favorite';
import { streamApi } from './stream';

export const api = {
  authentication: authenticationApi,
  user: userApi,
  cameras: camerasApi,
  favorite: favoriteApi,
  stream: streamApi,
};
