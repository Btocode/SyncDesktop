import React from 'react';
import ExtensionItem from '../components/ExtensionItem';
import { Extension } from '../types';
import { colors, commonStyles, spacing } from '../styles/theme';

interface ExtensionsPageProps {
  extensions: Extension[];
  onToggleExtension: (extensionId: string) => void;
}

function ExtensionsPage({ extensions, onToggleExtension }: ExtensionsPageProps) {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Extensions</h1>
          <p className="dashboard-subtitle">Manage all your extensions across devices</p>
        </div>
        <button className="btn btn-primary">Install New Extension</button>
      </div>

      <div style={commonStyles.flexBetween}>
        <div>
          <input
            type="text"
            placeholder="Search extensions..."
            style={{
              ...commonStyles.input,
              width: '300px'
            }}
          />
        </div>
        <div>
          <select style={commonStyles.input}>
            <option>All Extensions</option>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
          <button className="btn btn-outline" style={{ marginLeft: spacing.sm }}>Refresh</button>
        </div>
      </div>

      <div className="extensions-list" style={{ maxHeight: '600px', marginTop: spacing.lg }}>
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

export default ExtensionsPage;