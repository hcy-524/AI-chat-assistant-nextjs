"use client";

import React, { forwardRef } from "react";
import Message from "./Message";

const MessageList = forwardRef(({ messages, isLoading }, ref) => {
  return (
    <div className="message-list" ref={ref}>
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
});

export default MessageList;
