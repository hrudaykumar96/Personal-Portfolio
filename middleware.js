import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');
    

    if (token && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/administration', request.url));
    }

    if (!token && request.nextUrl.pathname === '/administration') {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    return NextResponse.next();
}


export const config = {
  matcher: ['/login', '/administration'],
};