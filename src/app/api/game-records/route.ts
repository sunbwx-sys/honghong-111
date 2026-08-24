import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/authService';
import { saveGameRecord, getUserRecords } from '@/lib/gameRecordService';
import { safeLogError } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const records = await getUserRecords(user.id);

    return NextResponse.json({
      success: true,
      records,
    });
  } catch (error) {
    safeLogError('GET /api/game-records', error);
    return NextResponse.json(
      { error: '获取游戏记录失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 验证登录
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { scenario, finalScore, result } = body;

    if (!scenario || finalScore === undefined || !result) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (result !== 'win' && result !== 'lose') {
      return NextResponse.json(
        { error: 'result 参数无效，只能是 win 或 lose' },
        { status: 400 }
      );
    }

    const record = await saveGameRecord(
      user.id,
      scenario,
      finalScore,
      result
    );

    return NextResponse.json({
      success: true,
      record,
    });
  } catch (error) {
    safeLogError('POST /api/game-records', error);
    return NextResponse.json(
      { error: '保存游戏记录失败' },
      { status: 500 }
    );
  }
}
