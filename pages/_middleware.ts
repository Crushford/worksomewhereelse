import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
  const { pathname, search } = req.nextUrl

  if (pathname === '/' && !search) {
    const country = req.geo.country
    if (country) return NextResponse.redirect(`/?country=${country}`)
  }
  return NextResponse.next()
}
