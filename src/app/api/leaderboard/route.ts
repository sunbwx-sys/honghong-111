import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/gameRecordService';

/**
 * GET /api/leaderboard
 * 获取排行榜（所有人都能看，不需要登录）
 */
export async function GET() {
  try {
    const entries = await getLeaderboard();

    return NextResponse.json({
      success: true,
      entries,
    });
  } catch (error: any) {
    console.error('[Leaderboard error]', error);
    return NextResponse.json(
      { error: '获取排行榜失败' },
      { status: 500 }
    );
  }
}
