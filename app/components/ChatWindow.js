"use client";

import React, { useRef, useEffect } from "react";
import MessageList from "./MessageList";
import InputArea from "./InputArea";

const ChatWindow = ({
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  onOpenSettings,
  currentMode,
}) => {
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    const list = messageListRef.current;
    if (list) {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="header-left">
          <h1>🤖 AI 聊天助手 (Next.js)</h1>
          <div className="mode-badge">
            {currentMode === "real" ? "🔗 真实模式 (代理API)" : "🎭 模拟模式"}
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn" onClick={onClearChat} title="清空对话">
            🗑️
          </button>
          <button className="icon-btn" onClick={onOpenSettings} title="设置">
            ⚙️
          </button>
        </div>
      </div>
      <MessageList
        ref={messageListRef}
        messages={messages}
        isLoading={isLoading}
      />
      <InputArea onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
