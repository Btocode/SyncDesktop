import React from 'react';
import { Extension } from '../types';
import '../styles/ExtensionsPage.css';

interface ExtensionItemProps {
  extension: Extension;
  onToggle: (extensionId: string) => void;
}

const ExtensionItem: React.FC<ExtensionItemProps> = ({ extension, onToggle }) => {
  return (
    <div className="extension-item">
      <div className="extension-info">
        <div className="extension-name">{extension.name}</div>
        <div className="extension-version">v{extension.version}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={`extension-status ${extension.enabled ? 'status-enabled' : 'status-disabled'}`}>
          {extension.enabled ? 'Enabled' : 'Disabled'}
        </div>
        <label className="extension-toggle" style={{ marginLeft: '1rem' }}>
          <input
            type="checkbox"
            checked={extension.enabled}
            onChange={() => onToggle(extension.id)}
          />
          <span className="extension-toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default ExtensionItem;