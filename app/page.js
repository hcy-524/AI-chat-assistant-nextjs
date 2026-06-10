'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ChatWindow from './components/ChatWindow';
import SettingsModal from './components/SettingsModal';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    mode: 'real',     // 模式: 'real' 使用代理API，'mock' 模拟
    model: 'gpt-3.5-turbo'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    // 欢迎消息
    setMessages([
      {
        id: '1',
        text: '你好！我是AI助手👋\n当前使用Next.js后端代理，API Key安全存储在服务器。\n点击右上角设置可切换模拟/真实模式。',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  // 保存设置
  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
  }, [settings]);

  // 模拟回复
  const generateMockResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('你好')) return '你好！很高兴见到你！😊';
    if (lowerMsg.includes('react')) return 'React是用于构建用户界面的JavaScript库！';
    if (lowerMsg.includes('next')) return 'Next.js是React框架，支持服务端渲染和API路由！';
    const defaultRes = ['有趣的问题！', '让我想想...', '能再说详细点吗？'];
    return defaultRes[Math.floor(Math.random() * defaultRes.length)];
  };

  // 调用后端代理API
  const callAPI = async (userMessage, history) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history,
        model: settings.model
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API请求失败');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let aiResponseText;
      if (settings.mode === 'real') {
        const recentMessages = [...messages, userMessage].slice(-10);
        const history = recentMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
        aiResponseText = await callAPI(text, history);
      } else {
        await new Promise(resolve => setTimeout(resolve, 600));
        aiResponseText = generateMockResponse(text);
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: `❌ 错误：${error.message}`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, settings.mode, settings.model]);

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      text: '对话已清空！有什么可以帮你的？✨',
      sender: 'ai',
      timestamp: new Date().toISOString()
    }]);
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="app">
      <div className="app-container">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onClearChat={clearChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          currentMode={settings.mode}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={updateSettings}
        />
      </div>
    </div>
  );
}