import { ReactNode } from 'react';

export type SEO = {
  title: string;
  description: string;
  type?: string;
  bg?: string;
};

export interface Meta {
  children: ReactNode;
  seo: SEO;
}
