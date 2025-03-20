import React from 'react';
import { TerminalConfig } from '../types';

interface TerminalConfigDisplayProps {
  config: TerminalConfig;
}

const TerminalConfigDisplay: React.FC<TerminalConfigDisplayProps> = ({ config }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="stat-item">
          <div className="stat-label">Shell</div>
          <div className="stat-value">{config.shell}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Font</div>
          <div className="stat-value">{config.font}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Font Size</div>
          <div className="stat-value">{config.fontSize}px</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Line Height</div>
          <div className="stat-value">{config.lineHeight}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Theme</div>
          <div className="stat-value">{config.theme}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Cursor Style</div>
          <div className="stat-value">{config.cursorStyle}</div>
        </div>
      </div>

      <h4>Custom Commands</h4>
      <div className="terminal-config">
        {config.customCommands.map((cmd, index) => (
          <div key={index} className="config-line">
            <span className="line-number">{index + 1}</span>
            <span className="line-content">{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalConfigDisplay;