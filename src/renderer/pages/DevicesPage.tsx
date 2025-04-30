import React, { JSX } from 'react';
import DeviceCard from '../components/DeviceCard';
import { DeviceConfig } from '../types';
import { spacing, commonStyles } from '../styles/theme';

interface DevicesPageProps {
  devices: DeviceConfig[];
  onDeviceSelect: (deviceId: string) => void;
  onToggleDeviceSync: (deviceId: string) => void;
  currentDevice?: DeviceConfig | null;
}

function DevicesPage({
  devices,
  onDeviceSelect,
  onToggleDeviceSync,
  currentDevice = null,
}: DevicesPageProps): JSX.Element {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Configured Devices</h1>
          <p className="dashboard-subtitle">Manage your synchronized devices</p>
        </div>
        <button type="button" className="btn btn-primary">
          Add New Device
        </button>
      </div>

      <div
        className="devices-grid"
        style={{
          ...commonStyles.gridContainer,
          gridTemplateColumns: 'repeat(2, 1fr)',
          marginTop: spacing.xl,
        }}
      >
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onClick={() => onDeviceSelect(device.id)}
            onToggleSync={onToggleDeviceSync}
            isCurrentDevice={currentDevice?.id === device.id}
          />
        ))}
      </div>
    </div>
  );
}

DevicesPage.defaultProps = {
  currentDevice: null,
};

export default DevicesPage;
