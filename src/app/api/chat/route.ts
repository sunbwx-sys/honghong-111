import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import {
  type Gender,
  type Message,
  type Option,
  MAX_ROUNDS,
} from '@/types/game';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ChatRequest {
  gender: Gender;
  scenario: string;
  messages: Message[];
  affection: number;
  step: number;
  isGameOver: boolean;
  won: boolean;
}

interface ChatResponse {
  partnerMessage: string;
  options: Option[];
}

// ⚠️ 降级默认回复，网络错误时使用
function getFallbackResponse(
  affection: number,
  step: number,
  isGameOver: boolean,
  won: boolean,
): ChatResponse {
  if (isGameOver) {
    if (won) {
      return {
        partnerMessage: '（脸微微泛红）好吧...这次就原谅你了。但你要保证下次不许再这样了！',
        options: [],
      };
    }
    return {
      partnerMessage: '我不想再跟你说了，我们都冷静一下吧...',
      options: [],
    };
  }

  const defaultOptions: Option[] = [
    { id: '1', content: '对不起，我知道错了', score: 10 },
    { id: '2', content: '我给你买你最喜欢吃的蛋糕好不好', score: 15 },
    { id: '3', content: '哎呀不就是这点小事吗', score: -15 },
    { id: '4', content: '你能不能别这么无理取闹', score: -25 },
    { id: '5', content: '我错了还不行吗（敷衍）', score: -10 },
    { id: '6', content: '这不是很正常的事吗', score: -20 },
  ];

  if (affection < 0) {
    return {
      partnerMessage: '（冷笑）你还知道来找我？我以为你根本不在乎呢。',
      options: defaultOptions,
    };
  }
  if (affection < 30) {
    return {
      partnerMessage: '哼，我现在不想跟你说话，你自己好好想想吧。',
      options: defaultOptions,
    };
  }
  if (affection < 60) {
    return {
      partnerMessage: '（撇了撇嘴）你说的是真的吗？我才不信呢...',
      options: defaultOptions,
    };
  }
  return {
    partnerMessage: '（小声）唔...那你下次不许再这样了哦...',
    options: defaultOptions,
  };
}

function getEmotionDescription(affection: number): string {
  if (affection < 0) return '非常生气，冷暴力或激烈质问的语气';
  if (affection < 30) return '还在生气，但愿意听对方说话的语气';
  if (affection < 60) return '开始软化，嘴上生气但语气缓和';
  if (affection < 80) return '快被哄好了，可能撒娇或小声说"哼"';
  return '已经原谅了，但还要对方保证不再犯';
}

function getPartnerNoun(gender: Gender): string {
  return gender === 'female' ? '女朋友' : '男朋友';
}

function getPartnerPronoun(gender: Gender): string {
  return gender === 'female' ? '她' : '他';
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { gender, scenario, messages, affection, step, isGameOver, won } = body;

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config({ timeout: 30000 });
    const client = new LLMClient(config, customHeaders);

    const partnerNoun = getPartnerNoun(gender);
    const partnerPronoun = getPartnerPronoun(gender);
    const emotion = getEmotionDescription(affection);

    // ⚠️ 关键实现要点：对话历史必须包含所有消息
    const chatHistory: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = messages.map((msg) => ({
      role: msg.role === 'partner' ? 'assistant' : 'user',
      content: msg.content,
    }));

    let systemPrompt = '';

    if (isGameOver) {
      // 游戏结束时的回复
      if (won) {
        systemPrompt = `你是一个正在被哄好的${partnerNoun}。
场景：${scenario}
当前状态：你已经被对方哄好了，心情转晴，但还有点小傲娇。
请用${emotion}的语气，说一句甜蜜又有点小傲娇的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`;
      } else {
        systemPrompt = `你是一个非常失望的${partnerNoun}。
场景：${scenario}
当前状态：对方没能哄好你，你非常失望和难过，决定结束这段对话。
请用${emotion}的语气，说一句绝情又带着悲伤的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`;
      }

      const response = await client.invoke(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: '请回复：' },
        ],
        { temperature: 0.9, model: 'doubao-seed-2-0-lite-260215' },
      );

      return NextResponse.json({
        partnerMessage: response.content.trim(),
        options: [],
      });
    }

    // 游戏进行中的回复
    systemPrompt = `你是一个正在生气的${partnerNoun}。
场景：${scenario}
当前好感度：${affection}（范围-50到100，初始20，80以上算被哄好）
当前情绪：${emotion}
当前轮次：第 ${step} 轮 / 共 ${MAX_ROUNDS} 轮

你的任务：
1. 根据当前情绪回复对方的话，回复要符合${partnerPronoun}的身份和情绪状态
2. 回复长度控制在30-80字之间
3. 可以用括号加入少量动作/表情描述，如（撇过头）（眼眶微红）等
4. 每次回复后，生成6个玩家可以选择的回应选项

6个选项的要求（非常重要）：
- 2个加分选项（+5到+20分）：真诚道歉、具体弥补方案、提起共同回忆等
- 4个减分选项（-5到-30分）：
  - 1-2个普通减分：敷衍、转移话题、找借口
  - 2-3个奇葩搞笑选项：离谱到好笑的程度，比如"要不你也气我一次扯平"这种
- 选项顺序要随机打乱
- 不要在选项中标注哪个是加分哪个是减分
- 每个选项要简短，15字以内

请严格按照以下JSON格式输出，不要有任何其他内容：
{
  "partnerMessage": "你的回复内容",
  "options": [
    {"id": "1", "content": "选项内容1", "score": 10},
    {"id": "2", "content": "选项内容2", "score": -15},
    ...共6个选项
  ]
}

注意：
- 对话要连贯，和之前的内容衔接
- 不要重复之前出现过的话题或选项
- 语气要自然，像真实情侣吵架后的对话
- 奇葩选项要真的很好笑，让人想分享给朋友`;

    const messagesForLLM: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
    ];

    // 确保至少有一条 user 消息
    if (chatHistory.length === 0 || chatHistory[chatHistory.length - 1].role !== 'user') {
      messagesForLLM.push({
        role: 'user',
        content: step === 1 ? '（对方刚开口，等待你的第一反应）' : '...',
      });
    }

    const response = await client.invoke(messagesForLLM, {
      temperature: 1.0,
      model: 'doubao-seed-2-0-lite-260215',
    });

    // 解析 JSON 响应
    let result: ChatResponse;
    try {
      // 尝试从响应中提取 JSON
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        result = {
          partnerMessage: parsed.partnerMessage || '',
          options: Array.isArray(parsed.options) ? parsed.options.slice(0, 6) : [],
        };
      } else {
        throw new Error('No JSON found');
      }

      // 验证选项数量
      if (result.options.length < 6) {
        throw new Error('Not enough options');
      }
    } catch (parseError) {
      console.error('Failed to parse LLM response:', parseError);
      console.error('Raw response:', response.content);
      result = getFallbackResponse(affection, step, isGameOver, won);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat API error:', error);
    // 降级返回默认值
    const fallback = getFallbackResponse(50, 1, false, false);
    return NextResponse.json(fallback);
  }
}
