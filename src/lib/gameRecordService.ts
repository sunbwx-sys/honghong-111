import { db } from '@/storage/database/db';
import { gameRecords, users } from '@/storage/database/shared/schema';
import { eq, desc, asc, inArray } from 'drizzle-orm';

export interface GameRecord {
  id: number;
  userId: number;
  scenario: string;
  finalScore: number;
  result: 'win' | 'lose';
  playedAt: string;
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
  const inserted = await db.insert(gameRecords).values({
    user_id: userId,
    scenario,
    final_score: finalScore,
    result,
  }).returning();

  if (inserted.length === 0) throw new Error('保存游戏记录失败');

  const row = inserted[0];
  return {
    id: row.id,
    userId: row.user_id,
    scenario: row.scenario,
    finalScore: row.final_score,
    result: row.result as 'win' | 'lose',
    playedAt: row.played_at.toISOString(),
  };
}

/**
 * 获取用户的游戏记录列表
 */
export async function getUserRecords(userId: number): Promise<GameRecord[]> {
  const rows = await db.select().from(gameRecords)
    .where(eq(gameRecords.user_id, userId))
    .orderBy(desc(gameRecords.played_at));

  return rows.map(row => ({
    id: row.id,
    userId: row.user_id,
    scenario: row.scenario,
    finalScore: row.final_score,
    result: row.result as 'win' | 'lose',
    playedAt: row.played_at.toISOString(),
  }));
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
  // 第一步：查出所有游戏记录，按分数降序、时间升序排列
  const records = await db.select({
    id: gameRecords.id,
    user_id: gameRecords.user_id,
    final_score: gameRecords.final_score,
    played_at: gameRecords.played_at,
  }).from(gameRecords)
    .orderBy(desc(gameRecords.final_score), asc(gameRecords.played_at))
    .limit(500);

  // 第二步：按用户去重，每个用户只保留最高分的那条
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

  // 第三步：批量查询这些用户的用户名
  const userIds = topEntries.map(e => e.userId);
  const userRows = await db.select({ id: users.id, username: users.username })
    .from(users)
    .where(inArray(users.id, userIds));

  const usernameMap = new Map<number, string>();
  for (const user of userRows) {
    usernameMap.set(user.id, user.username);
  }

  // 第四步：组装结果，带上排名
  return topEntries.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    username: usernameMap.get(entry.userId) || '匿名用户',
    highestScore: entry.highestScore,
    achievedAt: entry.achievedAt,
  }));
}
