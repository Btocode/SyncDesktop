import React from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import { DeviceConfig, Extension, TerminalConfig, ThemeConfig } from '../types';
import DeviceDetailsPage from '../pages/DeviceDetailsPage';
import DevicesPage from '../pages/DevicesPage';
import ExtensionsPage from '../pages/ExtensionsPage';
import TerminalPage from '../pages/TerminalPage';
import ThemesPage from '../pages/ThemesPage';
import SettingsPage from '../pages/SettingsPage';

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
            <ThemesPage themeConfig={themeConfig} />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;