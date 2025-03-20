import React from 'react';
import DeviceCard from '../components/DeviceCard';
import { DeviceConfig } from '../types';
import { spacing } from '../styles/theme';

interface DevicesPageProps {
  devices: DeviceConfig[];
  onDeviceSelect: (deviceId: string) => void;
  onToggleDeviceSync: (deviceId: string) => void;
}

const DevicesPage: React.FC<DevicesPageProps> = ({
  devices,
  onDeviceSelect,
  onToggleDeviceSync
}) => {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Configured Devices</h1>
          <p className="dashboard-subtitle">Manage your synchronized devices</p>
        </div>
        <button className="btn btn-primary">Add New Device</button>
      </div>

      <div className="devices-grid" style={{ marginTop: spacing.xl }}>
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onClick={() => onDeviceSelect(device.id)}
            onToggleSync={onToggleDeviceSync}
          />
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;