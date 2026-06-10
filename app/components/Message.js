'use client';

import React from 'react';

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-bubble" style={message.isError ? { background: '#fee', color: '#c33', border: '1px solid #fcc' } : {}}>
        {message.text}
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;