import React from 'react';
import ExtensionItem from '../ExtensionItem';
import { Extension } from '../../types';

interface ExtensionsTabProps {
  extensions: Extension[];
  onToggleExtension: (extensionId: string) => void;
}

function ExtensionsTab({ extensions, onToggleExtension }: ExtensionsTabProps) {
  return (
    <div className="device-extensions-tab">
      <div className="extensions-header">
        <div>
          <h3 className="extensions-title">Installed Extensions</h3>
          <p className="extensions-subtitle">
            {extensions.filter(e => e.enabled).length} enabled, {extensions.filter(e => !e.enabled).length} disabled
          </p>
        </div>
        <div>
          <button className="btn btn-outline">Refresh</button>
        </div>
      </div>

      <div className="extensions-list">
        {extensions.map(ext => (
          <ExtensionItem
            key={ext.id}
            extension={ext}
            onToggle={onToggleExtension}
          />
        ))}
      </div>
    </div>
  );
};

export default ExtensionsTab;