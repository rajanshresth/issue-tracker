import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const protectedRoutes = [
        '/issues/new',
        '/issues/edit/'
    ];

    const pathname = request.nextUrl.pathname;
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (!isProtected) return NextResponse.next();

    try {
        const res = await fetch(new URL('/api/auth/session', request.nextUrl.origin), {
            headers: { cookie: request.headers.get('cookie') || '' },
        });
        const data = await res.json().catch(() => null);
        if (!data?.session) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id+'
    ]
}