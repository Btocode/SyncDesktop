import React from 'react';
import { DeviceConfig } from '../../types';
import { spacing } from '../../styles/theme';

interface OverviewTabProps {
  device: DeviceConfig;
}

function OverviewTab({ device }: OverviewTabProps) {
  return (
    <div className="device-overview-tab">
      <div className="device-stats-grid">
        <div className="stat-item">
          <div className="stat-label">Extensions</div>
          <div className="stat-value">{device.extensionsCount.total}</div>
          <div className="stat-subtext">
            {device.extensionsCount.enabled} enabled, {device.extensionsCount.disabled} disabled
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Terminal Config</div>
          <div className="stat-value">{device.terminalConfigured ? 'Configured' : 'Not Configured'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Theme Config</div>
          <div className="stat-value">{device.themeConfigured ? 'Configured' : 'Not Configured'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Sync Status</div>
          <div className="stat-value">{device.syncEnabled ? 'Enabled' : 'Disabled'}</div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-row">
          <button className="btn btn-primary">Sync Now</button>
          <button className="btn btn-outline">Reset Configuration</button>
          <button className="btn btn-outline">Remove Device</button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;