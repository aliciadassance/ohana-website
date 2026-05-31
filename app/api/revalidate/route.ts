import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('prismic')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
