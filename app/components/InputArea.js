'use client';

import React, { useState, useRef, useEffect } from 'react';

const InputArea = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="输入消息... (Enter发送, Shift+Enter换行)"
          value={inputValue}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          rows={1}
          disabled={isLoading}
        />
      </div>
      <button className="send-btn" onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
        {isLoading ? '⏳' : '📤'}
      </button>
    </div>
  );
};

export default InputArea;