import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function middleware(req) {
    const token = cookies().get("Authorization")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { pathname } = req.nextUrl;

    try {
        if (token) {
            // Verify the token using `jose`
            await jose.jwtVerify(token, secret);

            // If the user is authenticated and tries to access `/login` or `/register`, redirect to `/dashboard`
            if (pathname === '/login' || pathname === '/register') {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }

            // If the user is authenticated and accessing protected routes, allow the request to proceed
            return NextResponse.next();
        } else {
            // If there is no token, redirect unauthenticated users to the login page when accessing `/dashboard`
            if (pathname.startsWith('/dashboard')) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // Allow access to login and register pages if the user is not authenticated
            return NextResponse.next();
        }
    } catch (error) {
        // Redirect to login if token verification fails
        if (pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Allow access to login and register pages if the token verification fails
        return NextResponse.next();
    }
}

// Configuring the middleware to run on the desired routes
export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
