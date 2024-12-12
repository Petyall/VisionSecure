import { StreamType } from '../../enums';

export interface StreamUrl {
  stream_type: string;
  user: string;
  password: string;
  url: string;
  port: number;
  args: string;
}

export interface Camera {
  id: number;
  name: string;
  location: string;
  stream_url: string | StreamUrl;
  created_at: Date;
  updated_at: Date;
}
