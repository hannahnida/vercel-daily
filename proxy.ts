import { type NextRequest, NextResponse } from 'next/server'
import { getSubscriptionStatus } from "@/lib/api/subscription";

export async function proxy(request: NextRequest) {
  console.log(`[Proxy] ${request.method} ${request.nextUrl.pathname}`)
  const token = request.cookies.get('subscription_token')?.value
  const requestHeaders = new Headers(request.headers)

  if (token) {
    try {
      const { isSubscribed } = await getSubscriptionStatus();
      requestHeaders.set('x-is-subscribed', isSubscribed ? 'true' : 'false');
    } catch {
      requestHeaders.set('x-is-subscribed', 'false')
    }
  } else {
    requestHeaders.set('x-is-subscribed', 'false')
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

// Configure which paths run the proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}