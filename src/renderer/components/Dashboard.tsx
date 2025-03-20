import React from 'react';
import '../App.css';
import Sidebar from './Sidebar';
// import DevicesPage from '../pages/DevicesPage';
// import DeviceDetailsPage from '../pages/DeviceDetailsPage';
// import ExtensionsPage from '../pages/ExtensionsPage';
// import TerminalPage from '../pages/TerminalPage';
import { DeviceConfig, Extension, TerminalConfig, ThemeConfig } from '../types';
import DeviceDetailsPage from '../pages/DeviceDetailsPage';
import DevicesPage from '../pages/DevicesPage';
import ExtensionsPage from '../pages/ExtensionsPage';
import TerminalPage from '../pages/TerminalPage';

// Mock data
const mockDevices: DeviceConfig[] = [
  {
    id: 'device-1',
    name: 'MacBook Pro',
    type: 'macOS',
    lastSynced: '2023-06-15 14:30',
    status: 'synced',
    syncEnabled: true,
    extensionsCount: {
      enabled: 42,
      disabled: 7,
      total: 49
    },
    terminalConfigured: true,
    themeConfigured: true
  },
  {
    id: 'device-2',
    name: 'Ubuntu Workstation',
    type: 'Linux',
    lastSynced: '2023-06-14 09:15',
    status: 'changed',
    syncEnabled: true,
    extensionsCount: {
      enabled: 38,
      disabled: 12,
      total: 50
    },
    terminalConfigured: true,
    themeConfigured: true
  },
  {
    id: 'device-3',
    name: 'Windows Desktop',
    type: 'Windows',
    lastSynced: '2023-06-10 18:45',
    status: 'error',
    syncEnabled: false,
    extensionsCount: {
      enabled: 35,
      disabled: 8,
      total: 43
    },
    terminalConfigured: false,
    themeConfigured: true
  }
];

const mockExtensions: Extension[] = [
  { id: 'ext-1', name: 'Python', version: '1.74.3', enabled: true },
  { id: 'ext-2', name: 'JavaScript ES6', version: '2.1.0', enabled: true },
  { id: 'ext-3', name: 'Git Integration', version: '0.36.2', enabled: true },
  { id: 'ext-4', name: 'Docker', version: '1.23.1', enabled: true },
  { id: 'ext-5', name: 'Markdown Preview', version: '3.0.0', enabled: true },
  { id: 'ext-6', name: 'ESLint', version: '2.4.2', enabled: false },
  { id: 'ext-7', name: 'Prettier', version: '9.10.4', enabled: true },
  { id: 'ext-8', name: 'React Snippets', version: '4.1.0', enabled: true },
  { id: 'ext-9', name: 'Material Theme', version: '2.8.0', enabled: true },
  { id: 'ext-10', name: 'Vim Emulation', version: '1.24.3', enabled: false },
  { id: 'ext-11', name: 'Remote SSH', version: '0.65.7', enabled: true },
  { id: 'ext-12', name: 'Live Server', version: '5.7.9', enabled: false }
];

const mockTerminalConfig: TerminalConfig = {
  shell: '/bin/zsh',
  font: 'Fira Code',
  fontSize: 14,
  lineHeight: 1.5,
  theme: 'One Dark Pro',
  cursorStyle: 'block',
  scrollback: 10000,
  customCommands: [
    'alias gs="git status"',
    'alias gc="git commit"',
    'alias gl="git log --oneline"',
    'export PATH="$HOME/.local/bin:$PATH"'
  ]
};

const mockThemeConfig: ThemeConfig = {
  uiTheme: 'Dark+',
  iconTheme: 'Material Icons',
  syntaxTheme: 'One Dark Pro',
  font: 'JetBrains Mono'
};

function Dashboard() {
  // State for active tab and selected device
  const [activeTab, setActiveTab] = React.useState<string>('devices');
  const [selectedDevice, setSelectedDevice] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState<DeviceConfig[]>(mockDevices);
  const [extensions, setExtensions] = React.useState<Extension[]>(mockExtensions);
  const [terminalConfig, setTerminalConfig] = React.useState<TerminalConfig>(mockTerminalConfig);
  const [themeConfig, setThemeConfig] = React.useState<ThemeConfig>(mockThemeConfig);

  // Handle device selection
  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setActiveTab('device-details');
  };

  // Handle back to devices list
  const handleBackToDevices = () => {
    setSelectedDevice(null);
    setActiveTab('devices');
  };

  // Toggle device sync
  const handleToggleDeviceSync = (deviceId: string) => {
    setDevices(devices.map(device =>
      device.id === deviceId
        ? { ...device, syncEnabled: !device.syncEnabled }
        : device
    ));
  };

  // Toggle extension
  const handleToggleExtension = (extensionId: string) => {
    setExtensions(extensions.map(ext =>
      ext.id === extensionId
        ? { ...ext, enabled: !ext.enabled }
        : ext
    ));
  };

  // Get the selected device
  const selectedDeviceData = selectedDevice
    ? devices.find(d => d.id === selectedDevice)
    : null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="dashboard-main">
          {activeTab === 'devices' && (
            <DevicesPage
              devices={devices}
              onDeviceSelect={handleDeviceSelect}
              onToggleDeviceSync={handleToggleDeviceSync}
            />
          )}

          {activeTab === 'device-details' && selectedDeviceData && (
            <DeviceDetailsPage
              device={selectedDeviceData}
              extensions={extensions}
              terminalConfig={terminalConfig}
              themeConfig={themeConfig}
              onToggleExtension={handleToggleExtension}
              onBackClick={handleBackToDevices}
            />
          )}

          {activeTab === 'extensions' && (
            <ExtensionsPage
              extensions={extensions}
              onToggleExtension={handleToggleExtension}
            />
          )}

          {activeTab === 'terminal' && (
            <TerminalPage
              terminalConfig={terminalConfig}
            />
          )}

          {activeTab === 'themes' && (
            <div>
              <div className="dashboard-header">
                <div>
                  <h1 className="dashboard-title">Theme Configuration</h1>
                  <p className="dashboard-subtitle">Customize your visual experience</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="stat-item">
                  <div className="stat-label">UI Theme</div>
                  <div className="stat-value">{themeConfig.uiTheme}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Icon Theme</div>
                  <div className="stat-value">{themeConfig.iconTheme}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Syntax Highlighting</div>
                  <div className="stat-value">{themeConfig.syntaxTheme}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Font</div>
                  <div className="stat-value">{themeConfig.font}</div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>Theme Preview</h3>
                <div style={{
                  backgroundColor: '#282c34',
                  padding: '1rem',
                  borderRadius: '6px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ color: '#c678dd' }}>function <span style={{ color: '#61afef' }}>calculateTotal</span>(<span style={{ color: '#e06c75' }}>items</span>) {'{'}</div>
                  <div style={{ marginLeft: '20px', color: '#abb2bf' }}>
                    <span style={{ color: '#c678dd' }}>const</span> total = items.<span style={{ color: '#61afef' }}>reduce</span>((sum, item) {'=>'} {'{'}
                  </div>
                  <div style={{ marginLeft: '40px', color: '#abb2bf' }}>
                    <span style={{ color: '#c678dd' }}>return</span> sum + item.price * item.quantity;
                  </div>
                  <div style={{ marginLeft: '20px', color: '#abb2bf' }}>{'}'}, <span style={{ color: '#d19a66' }}>0</span>);</div>
                  <div style={{ marginLeft: '20px', color: '#abb2bf' }}>
                    <span style={{ color: '#c678dd' }}>return</span> total;
                  </div>
                  <div style={{ color: '#abb2bf' }}>{'}'}</div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button className="btn btn-primary">Customize Theme</button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
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
                      <input type="checkbox" checked={true} />
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
                      <input type="checkbox" checked={true} />
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
                      <input type="checkbox" checked={false} />
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;