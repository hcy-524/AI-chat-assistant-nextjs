'use client';

import React from 'react';
import Message from './Message';

const MessageList = ({ messages, isLoading }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="message ai">
          <div className="loading-indicator">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;