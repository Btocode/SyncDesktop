import React from 'react';
import { DeviceConfig, Extension, TerminalConfig, ThemeConfig } from '../types';
import OverviewTab from '../components/device-details/OverviewTab';
import ExtensionsTab from '../components/device-details/ExtensionsTab';
import TerminalTab from '../components/device-details/TerminalTab';
import ThemeTab from '../components/device-details/ThemeTab';
import '../styles/device-details.css';

interface DeviceDetailsPageProps {
  device: DeviceConfig;
  extensions: Extension[];
  themeConfig: ThemeConfig;
  onBackClick: () => void;
}

function DeviceDetailsPage({
  device,
  extensions,
  themeConfig,
  onBackClick
}: DeviceDetailsPageProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="device-details-page">
      <div className="device-header">
        <div>
          <button className="btn btn-outline back-button" onClick={onBackClick}>
            ← Back to Devices
          </button>
          <h1 className="dashboard-title">{device.name}</h1>
          <p className="dashboard-subtitle">{device.type} • Last synced: {device.lastSynced}</p>
        </div>
        <div className="device-status">
          <span className={`status-indicator status-${device.status}`}></span>
          <span className="status-text">
            {device.status === 'synced' ? 'Synced' : device.status === 'changed' ? 'Changed' : 'Error'}
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={device.syncEnabled}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div
          className={`tab ${activeTab === 'extensions' ? 'active' : ''}`}
          onClick={() => setActiveTab('extensions')}
        >
          Extensions
        </div>
        <div
          className={`tab ${activeTab === 'terminal' ? 'active' : ''}`}
          onClick={() => setActiveTab('terminal')}
        >
          Terminal
        </div>
        <div
          className={`tab ${activeTab === 'theme' ? 'active' : ''}`}
          onClick={() => setActiveTab('theme')}
        >
          Theme
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab device={device} />}

      {activeTab === 'extensions' && (
        <ExtensionsTab
          extensions={extensions}
          onToggleExtension={onToggleExtension}
        />
      )}

      {activeTab === 'terminal' && <TerminalTab terminalConfig={terminalConfig} />}

      {activeTab === 'theme' && <ThemeTab themeConfig={themeConfig} />}
    </div>
  );
}

export default DeviceDetailsPage;