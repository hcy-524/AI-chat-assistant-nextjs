'use client';

import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>⚙️ 设置</h2>
        <div className="form-group">
          <label>对话模式</label>
          <select value={localSettings.mode} onChange={(e) => handleChange('mode', e.target.value)}>
            <option value="mock">🎭 模拟模式 (本地回复)</option>
            <option value="real">🔗 真实模式 (通过安全代理)</option>
          </select>
          <small>真实模式使用服务器端API Key，无需前端配置</small>
        </div>
        {localSettings.mode === 'real' && (
          <div className="form-group">
            <label>模型选择</label>
            <select value={localSettings.model} onChange={(e) => handleChange('model', e.target.value)}>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="gpt-4">GPT-4 (需额度)</option>
            </select>
            <small>模型每日额度请参考GPT_API_free说明</small>
          </div>
        )}
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>取消</button>
          <button className="btn btn-primary" onClick={handleSave}>保存</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;