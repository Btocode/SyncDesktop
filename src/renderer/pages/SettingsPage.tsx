import React from 'react';

function SettingsPage() {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Settings</h1>
          <p className="dashboard-subtitle">Configure SyncD application settings</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>General Settings</h3>
        <div className="settings-group">
          <div className="settings-item">
            <div>
              <div className="settings-label">Auto-sync on startup</div>
              <div className="settings-description">Automatically sync all devices when application starts</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={true} />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div>
              <div className="settings-label">Sync frequency</div>
              <div className="settings-description">How often to check for changes</div>
            </div>
            <select
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 0.75rem',
                color: 'var(--text-primary)',
                width: '150px'
              }}
            >
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Every hour</option>
              <option>Manual only</option>
            </select>
          </div>

          <div className="settings-item">
            <div>
              <div className="settings-label">Notifications</div>
              <div className="settings-description">Show notifications for sync events</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={true} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Advanced Settings</h3>
        <div className="settings-group">
          <div className="settings-item">
            <div>
              <div className="settings-label">Conflict resolution</div>
              <div className="settings-description">How to handle conflicting changes</div>
            </div>
            <select
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 0.75rem',
                color: 'var(--text-primary)',
                width: '200px'
              }}
            >
              <option>Ask me every time</option>
              <option>Use most recent</option>
              <option>Keep local changes</option>
              <option>Keep remote changes</option>
            </select>
          </div>

          <div className="settings-item">
            <div>
              <div className="settings-label">Debug mode</div>
              <div className="settings-description">Enable detailed logging for troubleshooting</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={false} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3>Storage</h3>
        <div className="settings-group">
          <div className="settings-item">
            <div>
              <div className="settings-label">Clear cache</div>
              <div className="settings-description">Remove temporary files</div>
            </div>
            <button className="btn btn-outline">Clear</button>
          </div>

          <div className="settings-item">
            <div>
              <div className="settings-label">Reset all settings</div>
              <div className="settings-description">Restore default configuration</div>
            </div>
            <button className="btn btn-outline" style={{ color: 'var(--accent-danger)' }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;