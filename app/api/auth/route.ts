import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const sitePassword = process.env.SITE_PASSWORD;
    if (!sitePassword) {
      console.error('SITE_PASSWORD env variable is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (password !== sitePassword) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
