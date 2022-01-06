import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.url === '/') {
    const country = req.geo.country || 'de'
    console.log(req)
    const res = NextResponse.rewrite(`/${country}`)

    return res
  }
  return NextResponse.next()
}
