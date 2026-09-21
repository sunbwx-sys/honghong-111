import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getUserById } from '@/lib/authService';
import { safeLogError } from '@/lib/utils';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'hong-hong-mock-secret-key-please-change-in-production'
);

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = parseInt(payload.sub as string, 10);

    if (!userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    safeLogError('GET /api/auth/me', error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
