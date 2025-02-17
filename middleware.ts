import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard','/contact']
const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/reset-password', '/auth/emailVerification', '/auth/verify-email', '/auth/logout']
const publicButProtected  = ['/auth/emailVerification']

export async function middleware(request: NextRequest) {
   // 2. Check if the current route is protected or public
   const path = request.nextUrl.pathname
   const isProtectedRoute = protectedRoutes.includes(path)
   const isPublicRoute = publicRoutes.includes(path)
   const isPublicButProtected = publicButProtected.includes(path)

	const cookies = getSessionCookie(request);

  
  if (isProtectedRoute && !cookies) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}
	// if (!cookies) {
	// 	return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	// }
	return NextResponse.next();
}

