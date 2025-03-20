import React from 'react';
import { spacing, colors } from '../styles/theme';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-section">
        <h1 style={{ margin: `0 0 ${spacing.xl} 0`, fontSize: '1.5rem' }}>SyncD</h1>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Main</h3>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === 'devices' ? 'active' : ''}`}
            onClick={() => setActiveTab('devices')}
          >
            <span className="sidebar-menu-item-icon">💻</span>
            Devices
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'extensions' ? 'active' : ''}`}
            onClick={() => setActiveTab('extensions')}
          >
            <span className="sidebar-menu-item-icon">🧩</span>
            Extensions
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <span className="sidebar-menu-item-icon">📟</span>
            Terminal
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            <span className="sidebar-menu-item-icon">🎨</span>
            Themes
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">System</h3>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="sidebar-menu-item-icon">⚙️</span>
            Settings
          </li>
          <li className="sidebar-menu-item">
            <span className="sidebar-menu-item-icon">❓</span>
            Help
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 'auto', padding: `${spacing.lg} 0` }}>
        <div style={{
          padding: spacing.md,
          backgroundColor: colors.bgTertiary,
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: spacing.sm }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: colors.accentPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.md,
              fontWeight: 'bold'
            }}>
              JS
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>John Smith</div>
              <div style={{ fontSize: '0.8rem', color: colors.textSecondary }}>Premium Plan</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem' }}>
            Manage Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;