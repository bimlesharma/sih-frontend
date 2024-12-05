import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const token = request.cookies.get('token')?.value || '';

    const isPublic = ['/login', '/signup', '/'].includes(path);

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // if (path === '/verifyemail') {
    //     return NextResponse.redirect(new URL('/verifyemail', request.url))
    // }
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/search', request.url))

    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup','/verifyemail', '/search', '/search/make-model','/search/specification','/search/service', '/profile/[id]', '/profile'],
}