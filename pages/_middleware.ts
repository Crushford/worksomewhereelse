import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl

  console.log(pathname)
  if (pathname === '/') {
    const country = req.geo.country || 'de'
    const res = NextResponse.rewrite(`/${country}`)

    return res
  }
  return NextResponse.next()
}
