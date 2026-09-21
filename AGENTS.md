# AGENTS.md

## 项目概览

**哄哄模拟器** - 一款情侣互动小游戏。AI扮演生气的对象，用户通过选择对话选项在10轮内把对方哄好。

### 版本技术栈
- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS 4
- **AI 集成**: coze-coding-dev-sdk (LLM + TTS)
- **状态管理**: React Context API (GameContext)

## 目录结构

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # 对话生成 API
│   │   └── tts/route.ts       # 语音合成 API
│   ├── layout.tsx             # 全局布局 + GameProvider
│   ├── page.tsx               # 主页面（根据状态切换界面）
│   └── globals.css            # 全局样式 + 自定义动画
├── components/
│   ├── ui/                    # shadcn/ui 组件库
│   ├── StartScreen.tsx        # 开始界面（性别/场景/语音选择）
│   ├── GameScreen.tsx         # 游戏主界面（对话+选项）
│   ├── GameOverScreen.tsx     # 结束界面（成功/失败）
│   ├── AffectionBar.tsx       # 好感度进度条
│   └── LoadingAnimation.tsx   # 加载动画（跳动爱心）
├── context/
│   └── GameContext.tsx        # 游戏全局状态管理
├── types/
│   └── game.ts                # 类型定义 + 常量 + 场景数据
└── lib/
    └── utils.ts               # 通用工具函数
```

## 核心游戏逻辑

### 状态流转
```
开始界面 → 选择性别/场景/语音 → 点击开始
    ↓
游戏主界面（循环10轮）
    ↓
每轮：用户选选项 → 更新好感度 → 生成对方回复 + 新6个选项
    ↓
结束条件：好感度≥80（成功） / 好感度≤-50（失败） / 10轮用完
    ↓
结束界面（成功/失败）
```

### 好感度规则
- 初始值：20
- 范围：-50 ~ 100
- 胜利条件：10轮内好感度 >= 80
- 失败条件：好感度 < -50 或 10轮用完好感度 < 80

### 选项生成规则
每轮 6 个选项：
- 2 个加分选项（+5 到 +20）：真诚道歉、弥补方案、共同回忆
- 4 个减分选项（-5 到 -30）：普通减分 1-2 个 + 奇葩搞笑 2-3 个
- 顺序随机打乱，不标注好坏

## API 接口

### POST /api/chat
对话生成接口，使用 LLM 实时生成回复和选项。

**请求体**:
```typescript
{
  gender: 'female' | 'male',
  scenario: string,
  messages: { role: 'user' | 'partner', content: string }[],
  affection: number,
  step: number,
  isGameOver: boolean,
  won: boolean,
}
```

**响应体**:
```typescript
{
  partnerMessage: string,
  options: { id: string, content: string, score: number }[],
}
```

**关键实现**:
- 对话历史必须包含所有消息（user + partner）
- 使用 JSON 格式解析 LLM 输出，解析失败有降级默认值
- 超时 30 秒，模型 doubao-seed-2-0-lite

### POST /api/tts
语音合成接口，使用 TTS SDK 生成语音。

**请求体**: `{ text, speaker, uid }`

**响应体**: `{ audioUri, audioSize }`

**关键实现**:
- 文本清理：去除括号中的动作描述（中文括号/英文括号/中括号）
- 超时 15 秒
- 失败不影响游戏流程
- 使用 HeaderUtils.extractForwardHeaders 转发请求头

## 关键实现要点

### 防闭包陷阱
GameContext 中使用函数式更新 `setGameState(prev => ...)` 读取最新状态。

### 防重复生成
GameScreen 使用 `isGeneratingRef` 和 `lastGeneratedMessageCountRef` 防止重复调用 API。

### 语音消息追踪
通过 `currentAudioMessageId` 检测新消息并生成对应语音，避免复用旧语音。

### 进度条实现
使用原生 div 实现好感度进度条（非 Progress 组件），支持颜色随好感度变化。

### 游戏结束消息
游戏结束时确保对方有最后一句回复，结束判断放在 `ADD_PARTNER_MESSAGE` action 中统一处理。

## 设计规范

视觉风格：粉紫色渐变、圆润卡片、爱心元素、温柔治愈感。详见 `DESIGN.md`。

## 开发命令

```bash
pnpm install       # 安装依赖
pnpm run dev       # 启动开发服务器
pnpm run build     # 构建生产版本
pnpm run start     # 启动生产服务器
pnpm ts-check      # TypeScript 类型检查
pnpm lint          # ESLint 检查
```

## 包管理

**仅允许使用 pnpm**。
