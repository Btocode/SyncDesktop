import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { DeviceConfig, Extension, ThemeConfig } from '../types';
import DeviceDetailsPage from '../pages/DeviceDetailsPage';
import DevicesPage from '../pages/DevicesPage';
import ExtensionsPage from '../pages/ExtensionsPage';
import TerminalPage from '../pages/TerminalPage';
import ThemesPage from '../pages/ThemesPage';
import SettingsPage from '../pages/SettingsPage';
import Loader from './Loader';

// Mock data for other components
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
  { id: 'ext-12', name: 'Live Server', version: '5.7.9', enabled: false },
];

const mockThemeConfig: ThemeConfig = {
  uiTheme: 'One Dark Pro',
  iconTheme: 'Nord',
  syntaxTheme: 'One Dark Pro',
  font: 'Fira Code',
  darkMode: true,
  monospaceFont: 'Fira Code',
  documentFont: 'Fira Code',
  fontAntialiasing: 'Subpixel',
  fontHinting: 'Auto',
  cursorTheme: 'Nord',
  cursorSize: 'Medium',
  buttonLayout: 'Default',
  animations: true,
  clockFormat: '12h',
  accentColor: '#008080',
};

function Dashboard() {
  // State for active tab and selected device
  const [activeTab, setActiveTab] = React.useState<string>('devices');
  const [selectedDevice, setSelectedDevice] = React.useState<string | null>(
    null,
  );
  const [devices, setDevices] = React.useState<DeviceConfig[]>([]);
  const [extensions, setExtensions] =
    React.useState<Extension[]>(mockExtensions);
  const [themeConfig, setThemeConfig] =
    React.useState<ThemeConfig>(mockThemeConfig);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentDevice, setCurrentDevice] = React.useState<DeviceConfig | null>(
    null,
  );

  // Fetch current device configuration
  useEffect(() => {
    const fetchDeviceConfig = async () => {
      try {
        setLoading(true);
        const config = (await window.electron.ipcRenderer.invoke(
          'get-device-config',
        )) as DeviceConfig;
        setCurrentDevice(config);

        console.log(config);

        // Update devices list with current device
        const updatedDevices = [...devices];
        const existingIndex = updatedDevices.findIndex(
          (d) => d.id === config.id,
        );

        if (existingIndex >= 0) {
          updatedDevices[existingIndex] = config;
        } else {
          updatedDevices.push(config);
        }

        setDevices(updatedDevices);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch device config',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceConfig();
  }, []);

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
    setDevices(
      devices.map((device) =>
        device.id === deviceId
          ? { ...device, syncEnabled: !device.syncEnabled }
          : device,
      ),
    );
  };

  // Get the selected device
  const selectedDeviceData = selectedDevice
    ? devices.find((d) => d.id === selectedDevice)
    : null;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

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
              currentDevice={currentDevice}
            />
          )}

          {activeTab === 'device-details' && selectedDeviceData && (
            <DeviceDetailsPage
              device={selectedDeviceData}
              extensions={extensions}
              themeConfig={themeConfig}
              onBackClick={handleBackToDevices}
            />
          )}

          {activeTab === 'extensions' && <ExtensionsPage />}

          {activeTab === 'terminal' && <TerminalPage />}

          {activeTab === 'themes' && <ThemesPage />}

          {activeTab === 'settings' && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
