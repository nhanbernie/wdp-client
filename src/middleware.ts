import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Danh sách các routes public (không cần token)
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/login-success',
  '/marketing',
  '/',
]

// Danh sách các routes cần xác thực
const authenticatedRoutes = [
  '/categories',
  '/products',
  '/cart',
  '/orders',
  '/admin',
  '/vendor',
  '/user',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Lấy token từ cookies
  const accessToken = request.cookies.get('accessToken')?.value
  
  // Kiểm tra nếu đang ở trang public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )
  
  // Kiểm tra nếu đang ở trang cần xác thực
  const isAuthenticatedRoute = authenticatedRoutes.some(route =>
    pathname.startsWith(route)
  )
  
  // Nếu đang ở trang cần xác thực nhưng không có token
  if (isAuthenticatedRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url)
    // Lưu URL hiện tại để redirect về sau khi đăng nhập
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Nếu đã có token và đang ở trang login/register
  // Redirect về trang chủ authenticated, AuthContext sẽ xử lý redirect dựa trên role
  if (accessToken && (pathname === '/login' || pathname === '/register')) {
    // Kiểm tra xem có URL "from" không (URL muốn quay về sau khi login)
    const fromUrl = request.nextUrl.searchParams.get('from')
    if (fromUrl && fromUrl !== '/login' && fromUrl !== '/register') {
      return NextResponse.redirect(new URL(fromUrl, request.url))
    }
    // Mặc định redirect về /categories, AuthContext sẽ redirect lại nếu cần
    return NextResponse.redirect(new URL('/categories', request.url))
  }
  
  return NextResponse.next()
}

// Cấu hình matcher để middleware chạy trên các routes cần thiết
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
