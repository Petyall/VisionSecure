import { UserRole } from '../../enums';
import { FavoriteCamera } from '../cameras/favorite.camera.interface';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  paternal_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  ban: boolean;

  favorite_cameras?: FavoriteCamera[];
}
