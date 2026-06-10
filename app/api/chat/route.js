import { NextResponse } from 'next/server';

// 从环境变量获取配置
const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.chatanywhere.tech/v1';

export async function POST(request) {
  try {
    const { messages, model = 'gpt-3.5-turbo' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: '无效的消息格式' }, { status: 400 });
    }

    if (!API_KEY) {
      console.error('未设置 OPENAI_API_KEY 环境变量');
      return NextResponse.json({ error: '服务器配置错误：缺少API Key' }, { status: 500 });
    }

    // 构建请求到 GPT_API_free
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API错误:', data);
      // 处理常见的错误码
      if (response.status === 401) return NextResponse.json({ error: 'API Key无效' }, { status: 401 });
      if (response.status === 429) return NextResponse.json({ error: '今日请求次数已达上限' }, { status: 429 });
      return NextResponse.json({ error: data.error?.message || 'AI服务异常' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('代理错误:', error);
    return NextResponse.json({ error: '内部服务器错误' }, { status: 500 });
  }
}