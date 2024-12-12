import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { navigation } from './app/_data/static';
import { api } from './app/_data/api';

const publicRoutes = ['/auth/signin', '/useful/'];

const hasAccess = (path: string, roles: string[]) => {
  const navItem = navigation.find((item) => {
    if (item.path.includes('{id}')) {
      const regex = new RegExp(item.path.replace('{id}', '\\d+'));
      return regex.test(path);
    }
    return path.startsWith(item.path);
  });
  return navItem ? navItem.allowedRoles.some((role) => roles.includes(role)) : false;
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  if (!accessToken) {
    if (!publicRoutes.some((route) => pathname.startsWith(route))) {
      const loginUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    const response = await api.authentication.validCheck(accessToken);

    if (!response || response.detail) {
      req.cookies.delete('access_token');
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    const userRole = response?.user?.role;
    if (!userRole || !hasAccess(pathname, [userRole])) {
      return NextResponse.redirect(new URL('/no-access', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};