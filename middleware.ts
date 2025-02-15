import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";
import { auth } from "./lib/auth";

export const sessionChecker = async (request: NextRequest): Promise<any> => {
  const data = await auth.api.getSession({
    headers: request.headers,
  });
  if (data && data.user && data.user.emailVerified === false) {
    sessionStorage.setItem("signupEmail", data?.user?.email);
    return NextResponse.redirect(new URL("/auth/emailVerification", request.url));
  }

  if(request.nextUrl.pathname === "/auth/emailVerification") {
    if (data && data.user && data.user.emailVerified === true) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();

}
export async function middleware(request: NextRequest) {
  // await sessionChecker(request);


  const response = NextResponse.next();

  // Retrieve the session cookie string.
  const sessionCookieString = getSessionCookie(request);
  console.log("Session cookie:", sessionCookieString);

  // Do not parse the string as JSON if it's not in JSON format.
  const sessionCookie = sessionCookieString || null;

  // Define allowed origins for CORS.
  const allowedOrigins = [
    "https://1b03-102-208-88-18.ngrok-free.app",
    "http://localhost:3000",
  ];

  const origin = request.headers.get("origin");
  if (origin && /^http:\/\/192\.168\.100\.\d{1,3}(:\d+)?$/.test(origin)) {
    allowedOrigins.push(origin);
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { headers: response.headers });
  }

  // For the email verification page, you might need more than just the token's existence.
  // If you require checking email verification status, you will need to decode or validate the token.
  // The following assumes that the token was a JSON string originally.
  if (request.nextUrl.pathname === "/auth/emailVerification") {
    // If you have additional means to verify the email status, do so here.
    // For example, if sessionCookie is a JWT, you could decode it as in Approach 1.
    // Here, we simply check that the cookie exists.
    const signupEmail = request.cookies.get("signupEmail");
    if (!signupEmail) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
  if (request.nextUrl.pathname === "/auth/emailVerification") {
    // If you have additional means to verify the email status, do so here.
    // For example, if sessionCookie is a JWT, you could decode it as in Approach 1.
    // Here, we simply check that the cookie exists.
    const signupEmail = request.cookies.get("signupEmail");
    if (!signupEmail) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/contact", "/auth/emailVerification"],
};
