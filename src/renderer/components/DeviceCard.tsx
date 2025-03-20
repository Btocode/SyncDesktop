import React from 'react';
import { DeviceConfig } from '../types';

interface DeviceCardProps {
  device: DeviceConfig;
  onClick: () => void;
  onToggleSync: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick, onToggleSync }) => {
  return (
    <div
      className="device-card"
      onClick={onClick}
    >
      <div className="device-header">
        <div>
          <h3 className="device-name">{device.name}</h3>
          <div className="device-type">{device.type}</div>
        </div>
        <div className="device-status">
          <span className={`status-indicator status-${device.status}`}></span>
          <span>{device.status === 'synced' ? 'Synced' : device.status === 'changed' ? 'Changed' : 'Error'}</span>
        </div>
      </div>

      <div className="device-stats">
        <div className="stat-item">
          <div className="stat-label">Extensions</div>
          <div className="stat-value">{device.extensionsCount.total}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Last Synced</div>
          <div className="stat-value" style={{ fontSize: '0.85rem' }}>{device.lastSynced}</div>
        </div>
      </div>

      <div className="device-actions">
        <button className="btn btn-outline">View Details</button>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={device.syncEnabled}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSync(device.id);
            }}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default DeviceCard;