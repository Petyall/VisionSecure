import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Meta as _Meta } from '@/app/_data/types';

const Meta: FC<PropsWithChildren<_Meta>> = ({ children, seo }) => {
  const setHeadTitle = (title: string) =>
    title !== '' ? `${title} | TCSD Dep.` : 'TCSD Dep.';

  return (
    <>
      <Head>
        <title>{setHeadTitle(seo.title)}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content={'#2B2B2B'} />
        <link rel="apple-touch-icon" href={'/favicon.ico'} />
        <link rel="shortcut icon" href={'/favicon.ico'} type="image/x-icon" />
        {seo.description ? (
          <>
            <meta name="description" content={seo.description} />
            <meta name="og:title" content={setHeadTitle(seo.title)} />
            <meta name="og:description" content={setHeadTitle(seo.title)} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
