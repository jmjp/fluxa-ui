import { NextRequest, NextResponse } from 'next/server';

const authPages = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isAuthPage = authPages.some((page) => request.nextUrl.pathname.startsWith(page));

  if (!token && !isAuthPage) return NextResponse.redirect(new URL('/login', request.url));
  if (token && isAuthPage) return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}

// Matcher: PULA /api/* (route handlers), /_next/* (assets), arquivos estaticos.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
