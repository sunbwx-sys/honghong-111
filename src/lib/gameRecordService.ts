import { eq, desc, asc, inArray } from 'drizzle-orm';
import {
  gameRecords as gameRecordsTable,
  users as usersTable,
} from '@/storage/database/shared/schema';
import { safeLogError } from '@/lib/utils';
import { ensureDbReady } from '@/storage/database/db';

// 从 drizzle 的 .select() 返回里抽出用到的字段类型（不用 InferModel，写出来更直观也更短）
type SavedRow = {
  id: number;
  user_id: number;
  scenario: string;
  final_score: number;
  result: 'win' | 'lose' | string;
  played_at: { toISOString(): string };
};
type RecordRow = SavedRow; // rows 类型和 inserted[0] 相同
type LeaderRecordRow = { id: number; user_id: number; final_score: number; played_at: { toISOString(): string } };
type UserRow = { id: number; username: string };

export interface GameRecord {
  id: number;
  userId: number;
  scenario: string;
  finalScore: number;
  result: 'win' | 'lose';
  playedAt: string;
}

async function getDb() {
  await ensureDbReady();
  const mod = await import('@/storage/database/db');
  return mod.db;
}

/**
 * 保存游戏记录
 */
export async function saveGameRecord(
  userId: number,
  scenario: string,
  finalScore: number,
  result: 'win' | 'lose',
): Promise<GameRecord> {
  const db = await getDb();
  try {
    const inserted = await db.insert(gameRecordsTable).values({
      user_id: userId,
      scenario,
      final_score: finalScore,
      result,
    }).returning();

    if (inserted.length === 0) throw new Error('保存游戏记录失败');

    const row = inserted[0] as SavedRow;
    return {
      id: row.id,
      userId: row.user_id,
      scenario: row.scenario,
      finalScore: row.final_score,
      result: row.result as 'win' | 'lose',
      playedAt: row.played_at.toISOString(),
    };
  } catch (err) {
    safeLogError('gameRecordService.saveGameRecord', err);
    throw err;
  }
}

/**
 * 获取用户的游戏记录列表
 */
export async function getUserRecords(userId: number): Promise<GameRecord[]> {
  const db = await getDb();
  try {
    const rows = await db.select().from(gameRecordsTable)
      .where(eq(gameRecordsTable.user_id, userId))
      .orderBy(desc(gameRecordsTable.played_at));

    return (rows as RecordRow[]).map(row => ({
      id: row.id,
      userId: row.user_id,
      scenario: row.scenario,
      finalScore: row.final_score,
      result: row.result as 'win' | 'lose',
      playedAt: row.played_at.toISOString(),
    }));
  } catch (err) {
    safeLogError('gameRecordService.getUserRecords', err);
    return [];
  }
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  highestScore: number;
  achievedAt: string;
}

/**
 * 获取排行榜（按最高好感度分数排名，前 20 名）
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const db = await getDb();
  try {
    const records = (await db.select({
      id: gameRecordsTable.id,
      user_id: gameRecordsTable.user_id,
      final_score: gameRecordsTable.final_score,
      played_at: gameRecordsTable.played_at,
    }).from(gameRecordsTable)
      .orderBy(desc(gameRecordsTable.final_score), asc(gameRecordsTable.played_at))
      .limit(500)) as LeaderRecordRow[];

    const seenUsers = new Set<number>();
    const topEntries: Array<{ userId: number; highestScore: number; achievedAt: string }> = [];

    for (const row of records) {
      if (!seenUsers.has(row.user_id)) {
        seenUsers.add(row.user_id);
        topEntries.push({
          userId: row.user_id,
          highestScore: row.final_score,
          achievedAt: row.played_at.toISOString(),
        });
        if (topEntries.length >= 20) break;
      }
    }

    if (topEntries.length === 0) return [];

    const userIds = topEntries.map(e => e.userId);
    const userRows = (await db.select({ id: usersTable.id, username: usersTable.username })
      .from(usersTable)
      .where(inArray(usersTable.id, userIds))) as UserRow[];

    const usernameMap = new Map<number, string>();
    for (const user of userRows) {
      usernameMap.set(user.id, user.username);
    }

    return topEntries.map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      username: usernameMap.get(entry.userId) || '匿名用户',
      highestScore: entry.highestScore,
      achievedAt: entry.achievedAt,
    }));
  } catch (err) {
    safeLogError('gameRecordService.getLeaderboard', err);
    return [];
  }
}
